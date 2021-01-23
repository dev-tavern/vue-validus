import { equalsByFieldName, field, fieldGroup } from '../../src'

describe('equalsByFieldName validator', () => {

  it('is valid when target field exists and value is equal', () => {
    const testField = field([equalsByFieldName('targetField')], 'test')
    const targetField = field([], 'test')
    const testForm = fieldGroup({ testField, targetField })
    testForm.validate()
    expect(testField.invalid).toBe(false)
  })

  it('is invalid when target field exists and value is not equal', () => {
    const testField = field([equalsByFieldName('targetField')], 'test')
    const targetField = field([], 'test1')
    const testForm = fieldGroup({ testField, targetField })
    testForm.validate()
    expect(testField.invalid).toBe(true)
  })

  it('is invalid when target field does not exist', () => {
    const testField = field([equalsByFieldName('targetField')], 'test')
    const testForm = fieldGroup({ testField })
    testForm.validate()
    expect(testField.invalid).toBe(true)
  })

  it('provides default message', () => {
    const validator = equalsByFieldName('test')
    expect(validator.message).toBe('Does not match')
  })

  it('uses custom message', () => {
    const validator = equalsByFieldName('test', 'custom message')
    expect(validator.message).toBe('custom message')
  })

})
