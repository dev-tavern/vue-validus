import { Ref, ref, unref, reactive } from 'vue'
import { FieldGroup, Validator } from '.'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Field<T = any> {
  __kind: 'Field'
  value: T | Ref<T>
  /**
   * If the field is currently considered invalid (did not pass latest validation).  
   * `true` if invalid, `false` if valid.
   */
  invalid: boolean | Ref<boolean>
  /**
   * List of failing validator names.
   */
  errors: string[]
  /**
   * List of failing validator messages.
   */
  errorMessages: string[]
  /**
   * Validate the current value of the field against all validators, returns true if valid and false if invalid.
   */
  validate(): boolean
  /**
   * Remove all errors and set the field to be valid.
   */
  clear(): void
  /**
   * Check if the field contains an error matching the provided validator name.
   * @param name 
   */
  hasError(name: string): boolean
  addValidator(validator: Validator): void
  removeValidator(validator: string | Validator): void
  setTopLevel(context: FieldGroup): void
}

function internalClear(errors: string[], errorMessages: string[], invalid: Ref<boolean>) {
  errors.splice(0, errors.length)
  errorMessages.splice(0, errorMessages.length)
  invalid.value = false
}

function internalHasError(errors: string[], name: string): boolean {
  return errors ? errors.includes(name) : false
}

function internalAddValidator(validators: Validator[], validator: Validator) {
  validators.push(validator)
}

function internalRemoveValidator(validators: Validator[], validator: string | Validator) {
  const validatorName = typeof validator === 'string' ? validator : validator.name
  const removeIndex = validators.map(v => v.name).indexOf(validatorName)
  if (removeIndex > -1) {
    validators.splice(removeIndex, 1)
  }
}

function internalValidate(fieldObj: Field, validators: Validator[], __topLevel?: FieldGroup): boolean {
  if (!validators || validators.length < 1) return true
  fieldObj.clear()
  validators.forEach(v => {
    const valid = v.execute(unref(fieldObj.value), __topLevel)
    if (!valid) {
      fieldObj.invalid = true
      if (!fieldObj.errors.includes(v.name)) fieldObj.errors.push(v.name)
      if (v.message && !fieldObj.errorMessages.includes(v.message)) fieldObj.errorMessages.push(v.message)
    }
  })
  return !fieldObj.invalid
}

/**
 * Create a Field with the provided validators and optional value. 
 * Can be validated alone or as part of a FieldGroup. 
 * The provided field value can be a Vue Ref object, 
 * in which case the value of this field and the Ref will be kept in sync.
 * @param validators
 * @param fieldValue
 */
export function field<T>(validators: Validator[], fieldValue?: T | Ref<T>): Field<T> {
  const value = ref(fieldValue)
  const invalid = ref(false)
  const errors: string[] = []
  const errorMessages: string[] = []
  let __topLevel: FieldGroup | undefined = undefined

  const fieldObj = reactive<Field>({
    value,
    invalid,
    errors,
    errorMessages
  } as Field)

  fieldObj.__kind = 'Field'
  fieldObj.clear = () => internalClear(errors, errorMessages, invalid)
  fieldObj.hasError = (name: string) => internalHasError(errors, name)
  fieldObj.addValidator = (validator: Validator) => internalAddValidator(validators, validator)
  fieldObj.removeValidator = (validator: string | Validator) => internalRemoveValidator(validators, validator)
  fieldObj.validate = () => internalValidate(fieldObj, validators, __topLevel)
  fieldObj.setTopLevel = (context: FieldGroup) => __topLevel = context

  return fieldObj
}
