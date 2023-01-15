/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ref, ComputedRef, unref, toRef } from 'vue-demi'
import { FieldGroupType } from '.'
import { getLength, hasValue, isField } from './utils'

export interface Validator {
  name: string
  message?: string
  execute(value: any, context?: FieldGroupType): boolean
}

/**
 * Field must have a value.
 * @param message 
 */
export function required(message?: string): Validator {
  if (!message) message = 'Required'
  return {
    name: 'required',
    message,
    execute: (value: any) => hasValue(value)
  }
}

const executeRequiredIf = (condition: boolean | Ref<boolean> | ComputedRef<boolean> | ((context?: FieldGroupType) => boolean)) => (value: any, context?: FieldGroupType) => {
  let doExecute = false
  if (typeof condition === 'function') {
    doExecute = condition(context)
  } else {
    doExecute = unref<boolean>(condition)
  }
  if (doExecute) {
    return hasValue(value)
  } else {
    return true
  }
}

/**
 * Field must have a value if the provided condition is met.
 * @param condition 
 * @param message 
 */
export function requiredIf(condition: boolean | Ref<boolean> | ComputedRef<boolean> | ((context?: FieldGroupType) => boolean), message?: string): Validator {
  if (!message) message = 'Required'
  return {
    name: 'required',
    message,
    execute: executeRequiredIf(condition)
  }
}

/**
 * Field must have a length no greater than the provided maximum.
 * @param maximum 
 * @param message 
 */
export function maxLength(maximum: number, message?: string): Validator {
  if (!message) message = `Exceeds maximum length of ${maximum}`
  return {
    name: 'maxLength',
    message,
    execute: (value: any) => hasValue(value) ? getLength(value) <= maximum : true
  }
}

/**
 * Field must have a length no less than the provided minimum.
 * @param minimum 
 * @param message 
 */
export function minLength(minimum: number, message?: string): Validator {
  if (!message) message = `Does not meet the minimum length of ${minimum}`
  return {
    name: 'minLength',
    message,
    execute: (value: any) => hasValue(value) ? getLength(value) >= minimum : true
  }
}

const executeEquals = (equalToValue: any) => (value: any) => {
  const currentEqualToValue = unref(equalToValue)
  return (hasValue(value) || hasValue(currentEqualToValue)) ? value === currentEqualToValue : true
}

/**
 * Field must have a value equal to the provided value.
 * @param equalTo 
 * @param message 
 */
export function equals(equalTo: any, message?: string): Validator {
  if (!message) message = 'Does not match'
  let equalToValue = equalTo
  if (isField(equalTo)) {
    equalToValue = toRef(equalTo, 'value')
  }
  return {
    name: 'equals',
    message,
    execute: executeEquals(equalToValue)
  }
}

const executeEqualsByFieldName = (equalToFieldName: string) => (value: any, context?: FieldGroupType) => {
  let equalToValue = null
  if (context) {
    const field = context.get(equalToFieldName)
    if (field && isField(field)) equalToValue = unref(field.value)
  }
  return (hasValue(value) || hasValue(equalToValue)) ? value === equalToValue : true
}

/**
 * Field must have a value equal to the value of the Field by the provided name.
 * @param equalToFieldName 
 * @param message 
 */
export function equalsByFieldName(equalToFieldName: string, message?: string): Validator {
  if (!message) message = 'Does not match'
  return {
    name: 'equalsByFieldName',
    message,
    execute: executeEqualsByFieldName(equalToFieldName)
  }
}

const executeMatch = (regexp: string | RegExp) => (value: any) => {
  let valid = true
  if (hasValue(value)) {
    if (typeof value === 'string') {
      valid = value.match(regexp) !== null
    } else {
      valid = String(value).match(regexp) !== null
    }
  }
  return valid
}

/**
 * Field must match the provided regular expression.
 * @param regexp 
 * @param message 
 */
export function match(regexp: string | RegExp, message?: string): Validator {
  if (!message) message = 'Does not meet requirement'
  return {
    name: 'match',
    message,
    execute: executeMatch(regexp)
  }
}

const EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

/**
 * Field must be a valid e-mail format.
 * @param message 
 */
export function email(message?: string): Validator {
  if (!message) message = 'Invalid e-mail'
  return {
    name: 'email',
    message,
    execute: match(EMAIL_REGEXP).execute
  }
}

/**
 * Field must be numeric.
 * @param message 
 */
export function numeric(message?: string): Validator {
  if (!message) message = 'Must be a number'
  return {
    name: 'numeric',
    message,
    execute: (value: any) => hasValue(value) ? !isNaN(parseFloat(value)) : true
  }
}

const executeMin = (minimum: number) => (value: any) => {
  let valid = true
  if (hasValue(value)) {
    const v = parseFloat(value)
    valid = !isNaN(v) && v >= minimum
  }
  return valid
}

/**
 * Field must have a value no less than the provided minimum.
 * @param minimum 
 * @param message 
 */
export function min(minimum: number, message?: string): Validator {
  if (!message) message = `Does not meet the minimum of ${minimum}`
  return {
    name: 'min',
    message,
    execute: executeMin(minimum)
  }
}

const executeMax = (maximum: number) => (value: any) => {
  let valid = true
  if (hasValue(value)) {
    const v = parseFloat(value)
    valid = !isNaN(v) && v <= maximum
  }
  return valid
}

/**
 * Field must have a value no greater than the provided maximum.
 * @param maximum 
 * @param message 
 */
export function max(maximum: number, message?: string): Validator {
  if (!message) message = `Exceeds maximum of ${maximum}`
  return {
    name: 'max',
    message,
    execute: executeMax(maximum)
  }
}
