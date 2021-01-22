import { reactive, ref, toRef } from 'vue'
import { field, minLength, required } from '../src'

describe('field', () => {

  it('is invalid when at least 1 validator is failed', () => {
    const testField = field([required(), minLength(10)], 'test')
    expect(testField.validate()).toBe(false)
    expect(testField.invalid).toBe(true)
  })

  it('is valid when all validators are successful', () => {
    const testField = field([required(), minLength(10)], 'testtest12')
    expect(testField.validate()).toBe(true)
    expect(testField.invalid).toBe(false)
  })

  it('is valid when no validators', () => {
    const testField = field([])
    expect(testField.validate()).toBe(true)
    expect(testField.invalid).toBe(false)
  })

  it('contains error when invalid', () => {
    const validator = minLength(10)
    const testField = field([validator], 'test')
    testField.validate()
    expect(testField.errors).toHaveLength(1)
    expect(testField.errors[0]).toBe(validator.name)
  })

  it('contains error message when invalid', () => {
    const validator = minLength(10)
    const testField = field([validator], 'test')
    testField.validate()
    expect(testField.errorMessages).toHaveLength(1)
    expect(testField.errorMessages[0]).toBe(validator.message)
  })

  it('contains error message when invalid with custom message', () => {
    const validator = minLength(10, 'custom error message')
    const testField = field([validator], 'test')
    testField.validate()
    expect(testField.errorMessages).toHaveLength(1)
    expect(testField.errorMessages[0]).toBe('custom error message')
  })

  it('removes all errors when cleared', () => {
    const testField = field([minLength(10)], 'test')
    testField.validate()
    testField.clear()
    expect(testField.invalid).toBe(false)
    expect(testField.errors).toHaveLength(0)
    expect(testField.errorMessages).toHaveLength(0)
  })

  it('hasError returns true when validator name existing in errors', () => {
    const validator = minLength(10)
    const testField = field([validator], 'test')
    testField.validate()
    expect(testField.hasError(validator.name)).toBe(true)
  })

  it('hasError returns false when validator name not existing in errors', () => {
    const validator = minLength(10)
    const testField = field([validator], 'test')
    testField.validate()
    expect(testField.hasError('required')).toBe(false)
  })

  it('can add validator after creation', () => {
    const validator = minLength(10)
    const testField = field([], 'test')
    testField.addValidator(validator)
    testField.validate()
    expect(testField.invalid).toBe(true)
  })

  it('can remove validator after creation', () => {
    const validator = minLength(10)
    const testField = field([validator], 'test')
    testField.removeValidator(validator)
    testField.validate()
    expect(testField.invalid).toBe(false)
  })

  it('can remove validator by name after creation', () => {
    const validator = minLength(10)
    const testField = field([validator], 'test')
    testField.removeValidator(validator.name)
    testField.validate()
    expect(testField.invalid).toBe(false)
  })

  it('does not remove validator when name not existing', () => {
    const validator = minLength(10)
    const testField = field([validator], 'test')
    testField.removeValidator('validator1')
    testField.validate()
    expect(testField.invalid).toBe(true)
  })

  it('retains reactivity with ref value', () => {
    const refObject = ref('test')
    const testField = field([required()], refObject)
    expect(testField.value).toBe('test')
    refObject.value = 'test2'
    expect(testField.value).toBe('test2')
  })

  it('retains reverse reactivity with ref value', () => {
    const refObject = ref('test')
    const testField = field([required()], refObject)
    expect(testField.value).toBe('test')
    testField.value = 'test2'
    expect(refObject.value).toBe('test2')
  })

  it('retains reactivity with reactive property value via toRef', () => {
    const data = reactive({
      targetValue: 'test'
    })
    const testField = field([required()], toRef(data, 'targetValue'))
    expect(testField.value).toBe('test')
    data.targetValue = 'test2'
    expect(testField.value).toBe('test2')
  })

  it('retains reverse reactivity with reactive property value via toRef', () => {
    const data = reactive({
      targetValue: 'test'
    })
    const testField = field([required()], toRef(data, 'targetValue'))
    expect(testField.value).toBe('test')
    testField.value = 'test2'
    expect(data.targetValue).toBe('test2')
  })

})