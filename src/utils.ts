/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Field, FieldGroup, FieldGroupProps } from '.'

export function getFromFields(fields: FieldGroupProps, fieldName: string): Field | FieldGroup | null {
  if (fields[fieldName]) return fields[fieldName]
  if (fieldName.includes('.')) {
    const parts = fieldName.split('.')
    let tempPath = ''
    for (let i = 0; i < parts.length; i++) {
      tempPath += `${parts[i]}`
      const field = fields[tempPath]
      if (isFieldGroup(field)) {
        return field.get(parts.splice(i + 1).join('.'))
      }
      tempPath += '.'
    }
  }
  return null
}

export function getValueFromFields(fields: FieldGroupProps, fieldName: string): any {
  const field = getFromFields(fields, fieldName)
  if (isField(field)) {
    return field.value
  }
  return null
}

export function isField(f: any): f is Field {
  return Boolean(f && f.__kind === 'Field')
}

export function isFieldGroup(f: any): f is FieldGroup {
  return Boolean(f && f.__kind === 'FieldGroup')
}

export function getLength(value: any): number {
  if (Array.isArray(value)) {
    return value.length
  }
  if (typeof value === 'object') {
    return Object.keys(value).length
  }
  return String(value).length
}

export function hasValue(value: any): boolean {
  if (value !== 0 && !value) {
    // !value checks:  undefined, null, empty string (''), 0, NaN, false
    return false
  }
  if (Array.isArray(value)) {
    return value.length > 0
  }
  if (typeof value === 'string' || value instanceof String) {
    return value.trim().length > 0
  }
  if (value instanceof Date) {
    return !isNaN(value.getTime())
  }
  if (typeof value === 'object') {
    for (const _i in value) {
      return true
    }
    return false
  }
  return true
}

export function toPlainObject<T = any>(fieldGroup: FieldGroup): T {
  const result: any = {}
  for (const entry of Object.entries(fieldGroup)) {
    if (isField(entry[1])) {
      result[entry[0]] = entry[1].value
    } else if (isFieldGroup(entry[1])) {
      result[entry[0]] = toPlainObject(entry[1])
    }
  }
  return result
}
