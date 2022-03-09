import { computed, reactive, Ref, toRef } from 'vue'
import { Field } from '.'
import { getFromFields, getValueFromFields } from './utils'

export interface FieldGroupProps {
  [key: string]: Field | FieldGroup
}

export interface FieldGroup {
  __kind: 'FieldGroup'
  /**
   * If the field group is currently considered invalid (did not pass latest validation).
   * `true` if any fields / field groups are invalid, `false` if all are valid.
   */
  invalid: boolean
  /**
   * Validate all fields within the field group.
   * Optionally, provide a name to validate a specific field / field group.
   */
  validate(fieldName?: string): boolean
  /**
   * Remove all errors and set the field group to be valid.
   */
  clear(): void
  /**
   * Get a member field / field group by name.
   * @param fieldName 
   * @example
   * const form = fieldGroup({ address: fieldGroup({ zip: field(...) }) })
   * const zipField = form.get('address.zip')
   */
  get(fieldName: string): Field | FieldGroupType | null
  /**
   * Get a member field's value by name.
   * @param fieldName 
   * @example
   * const form = fieldGroup({ address: fieldGroup({ zip: field(...) }) })
   * const zipValue = form.getValue('address.zip')
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getValue(fieldName: string): any
  /**
   * Get all invalid fields / field groups within the field group.
   */
  getErrorFields(): (Field | FieldGroupType)[]
  setTopLevel(context: FieldGroup): void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FieldGroupType<T extends FieldGroupProps = any> = FieldGroup & {
  [K in keyof T]: T[K]
}

function internalValidate(fields: FieldGroupProps, fieldName?: string): boolean {
  let valid = true
  if (fieldName) {
    const field = getFromFields(fields, fieldName)
    if (field) valid = field.validate()
  } else {
    for (const field of Object.entries(fields)) {
      const fieldValid = field[1].validate()
      if (!fieldValid && valid) valid = false
    }
  }
  return valid
}

function internalClear(fields: FieldGroupProps) {
  for (const field of Object.entries(fields)) {
    field[1].clear()
  }
}

function isValid(fields: FieldGroupProps) {
  for (const field of Object.entries(fields)) {
    if (field[1].invalid) {
      return false
    }
  }
  return true
}

function internalGetErrorFields(fields: FieldGroupProps, invalid: Ref<boolean>): (Field | FieldGroupType)[] {
  const errorFields: (Field | FieldGroup)[] = []
  if (invalid.value) {
    for (const field of Object.entries(fields)) {
      if (field[1].invalid) {
        errorFields.push(field[1])
      }
    }
  }
  return errorFields
}

function internalSetTopLevel(selfTopLevel: FieldGroup | undefined, fields: FieldGroupProps, context: FieldGroup): void {
  selfTopLevel = context
  for (const field of Object.entries(fields)) {
    field[1].setTopLevel(selfTopLevel)
  }
}

function applyObjectPropertiesToFields(data: Record<string, unknown>, fieldGroupObj: FieldGroup): void {
  for (const field of Object.entries(data)) {
    const fieldProp = fieldGroupObj.get(field[0])
    if (fieldProp && fieldProp.__kind === 'FieldGroup') {
      applyObjectPropertiesToFields(field[1] as Record<string, unknown>, fieldProp)
    } else if (fieldProp && fieldProp.__kind === 'Field') {
      fieldProp.value = toRef(data, field[0])
    }
  }
}

/**
 * Create a group of fields / field groups which can be validated and inspected via a single object. 
 * If a data object is provided, the values of the data object will be applied to the properties 
 * (field and/or field groups) of this field group. 
 * If the provided data object is a Vue reactive object or object containing Vue refs, 
 * the values within the field group will remain in sync with the provided data object.
 * @param fields
 * @param data
 */
export function fieldGroup<T extends FieldGroupProps>(fields: T, data?: Record<string, unknown>): FieldGroupType<T> {
  const __topLevel: FieldGroup | undefined = undefined
  const invalid = computed(() => !isValid(fields))

  const fieldGroupObj = reactive({
    ...fields,
    invalid
  }) as FieldGroupType<T>

  fieldGroupObj.__kind = 'FieldGroup'
  fieldGroupObj.validate = (fieldName?: string) => internalValidate(fields, fieldName)
  fieldGroupObj.clear = () => internalClear(fields)
  fieldGroupObj.get = (fieldName: string) => getFromFields(fields, fieldName)
  fieldGroupObj.getValue = (fieldName: string) => getValueFromFields(fields, fieldName)
  fieldGroupObj.getErrorFields = () => internalGetErrorFields(fields, invalid)
  fieldGroupObj.setTopLevel = (context: FieldGroup) => internalSetTopLevel(__topLevel, fields, context)

  // inject self into child fields (assume self as top level context)
  const selfContext = { get: fieldGroupObj.get, getValue: fieldGroupObj.getValue, ...fields } as FieldGroupType<T>
  for (const field of Object.entries(fields)) {
    field[1].setTopLevel(selfContext)
  }

  if (data) {
    applyObjectPropertiesToFields(data, fieldGroupObj)
  }

  return fieldGroupObj
}
