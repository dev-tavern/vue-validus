import { reactive, ref } from 'vue'
import { field, fieldGroup, minLength, required, Validator } from '../src'

const validField = () => field([required()], 'test')
const invalidField = () => field([required()], '')

describe('fieldGroup', () => {

  it('is invalid when at least 1 field is invalid', () => {
    const testFieldGroup = fieldGroup({ field1: validField(), field2: invalidField() })
    expect(testFieldGroup.validate()).toBe(false)
    expect(testFieldGroup.invalid).toBe(true)
  })

  it('is valid when all fields are valid', () => {
    const testFieldGroup = fieldGroup({ field1: validField(), field2: validField() })
    expect(testFieldGroup.validate()).toBe(true)
    expect(testFieldGroup.invalid).toBe(false)
  })

  it('is valid when no validators', () => {
    const testFieldGroup = fieldGroup({ field1: field([]) })
    expect(testFieldGroup.validate()).toBe(true)
    expect(testFieldGroup.invalid).toBe(false)
  })

  it('validates specific field via validate', () => {
    const mockValidator: Validator = {
      name: 'mock',
      execute: jest.fn()
    }
    const testFieldGroup = fieldGroup({ targetField: field([mockValidator], 'test') })
    testFieldGroup.validate('targetField')
    expect(mockValidator.execute).toHaveBeenCalled()
  })

  it('validates specific nested field via validate', () => {
    const mockValidator: Validator = {
      name: 'mock',
      execute: jest.fn()
    }
    const testFieldGroup = fieldGroup({
      nestedFieldGroup: fieldGroup({
        targetField: field([mockValidator], 'test')
      })
    })
    testFieldGroup.validate('nestedFieldGroup.targetField')
    expect(mockValidator.execute).toHaveBeenCalled()
  })

  it('validate returns true when field does not exist', () => {
    const testFieldGroup = fieldGroup({ targetField: field([], 'test') })
    const valid = testFieldGroup.validate('unknownField')
    expect(valid).toBe(true)
  })

  it('contains error field when invalid', () => {
    const targetField = invalidField()
    const testFieldGroup = fieldGroup({ targetField, validField: validField() })
    testFieldGroup.validate()
    const errorsFields = testFieldGroup.getErrorFields()
    expect(errorsFields).toHaveLength(1)
    expect(errorsFields[0]).toBe(targetField)
  })

  it('contains error fieldGroup when invalid', () => {
    const targetFieldGroup = fieldGroup({ field1: invalidField() })
    const testFieldGroup = fieldGroup({ targetFieldGroup })
    testFieldGroup.validate()
    const errorsFields = testFieldGroup.getErrorFields()
    expect(errorsFields).toHaveLength(1)
    expect(errorsFields[0]).toBe(targetFieldGroup)
  })

  it('removes all errors when cleared', () => {
    const testFieldGroup = fieldGroup({ field1: invalidField() })
    testFieldGroup.validate()
    testFieldGroup.clear()
    expect(testFieldGroup.invalid).toBe(false)
    expect(testFieldGroup.getErrorFields()).toHaveLength(0)
  })

  it('returns field when get called with field name', () => {
    const targetField = validField()
    const testFieldGroup = fieldGroup({ targetField })
    expect(testFieldGroup.get('targetField')).toEqual(targetField)
  })

  it('returns nested field when get called with field path', () => {
    const targetField = validField()
    const testFieldGroup = fieldGroup({
      nestedFieldGroup: fieldGroup({
        targetField
      })
    })
    const testFieldGroup2 = fieldGroup({
      nestedFieldGroup: fieldGroup({
        nestedFieldGroup2: fieldGroup({
          targetField
        })
      })
    })
    expect(testFieldGroup.get('nestedFieldGroup.targetField')).toEqual(targetField)
    expect(testFieldGroup2.get('nestedFieldGroup.nestedFieldGroup2.targetField')).toEqual(targetField)
  })

  it('returns fieldGroup when get called with fieldGroup name', () => {
    const targetFieldGroup = fieldGroup({})
    const testFieldGroup = fieldGroup({ targetFieldGroup })
    expect(testFieldGroup.get('targetFieldGroup')).toEqual(targetFieldGroup)
  })

  it('returns nested fieldGroup when get called with fieldGroup path', () => {
    const targetFieldGroup = fieldGroup({})
    const testFieldGroup = fieldGroup({
      nestedFieldGroup: fieldGroup({
        targetFieldGroup
      })
    })
    const testFieldGroup2 = fieldGroup({
      nestedFieldGroup: fieldGroup({
        nestedFieldGroup2: fieldGroup({
          targetFieldGroup
        })
      })
    })
    expect(testFieldGroup.get('nestedFieldGroup.targetFieldGroup')).toEqual(targetFieldGroup)
    expect(testFieldGroup2.get('nestedFieldGroup.nestedFieldGroup2.targetFieldGroup')).toEqual(targetFieldGroup)
  })

  it('returns null when get called with non-exsting field name', () => {
    const targetField = validField()
    const testFieldGroup = fieldGroup({ targetField })
    expect(testFieldGroup.get('invalidField')).toEqual(null)
  })

  it('returns field value when getValue called with field name', () => {
    const targetField = validField()
    const testFieldGroup = fieldGroup({ targetField })
    expect(testFieldGroup.getValue('targetField')).toEqual(targetField.value)
  })

  it('returns nested field value when getValue called with field path', () => {
    const targetField = validField()
    const testFieldGroup = fieldGroup({
      nestedFieldGroup: fieldGroup({
        targetField
      })
    })
    const testFieldGroup2 = fieldGroup({
      nestedFieldGroup: fieldGroup({
        nestedFieldGroup2: fieldGroup({
          targetField
        })
      })
    })
    expect(testFieldGroup.getValue('nestedFieldGroup.targetField')).toEqual(targetField.value)
    expect(testFieldGroup2.getValue('nestedFieldGroup.nestedFieldGroup2.targetField')).toEqual(targetField.value)
  })

  it('returns null when getValue called with fieldGroup name', () => {
    const targetFieldGroup = fieldGroup({})
    const testFieldGroup = fieldGroup({ targetFieldGroup })
    expect(testFieldGroup.getValue('targetFieldGroup')).toEqual(null)
  })

  it('returns null when getValue called with non-exsting field name', () => {
    const targetField = validField()
    const testFieldGroup = fieldGroup({ targetField })
    expect(testFieldGroup.getValue('invalidField')).toEqual(null)
  })

})

describe('fieldGroup with data source', () => {

  it('maps and retains reactivity for reactive object', () => {
    const data = reactive({
      targetField: 'test',
      nestedGroup: {
        targetField2: 'nested'
      }
    })
    const testFieldGroup = fieldGroup({
      targetField: field([]),
      nestedGroup: fieldGroup({
        targetField2: field([])
      })
    }, data)
    expect(testFieldGroup.targetField.value).toEqual(data.targetField)
    expect(testFieldGroup.nestedGroup.targetField2.value).toEqual(data.nestedGroup.targetField2)
    data.targetField = 'test2'
    data.nestedGroup.targetField2 = 'nested2'
    expect(testFieldGroup.targetField.value).toEqual(data.targetField)
    expect(testFieldGroup.nestedGroup.targetField2.value).toEqual(data.nestedGroup.targetField2)
  })

  it('maps and retains reactivity for refs object', () => {
    const data = {
      targetField: ref('test'),
      nestedGroup: {
        targetField2: ref('nested')
      }
    }
    const testFieldGroup = fieldGroup({
      targetField: field([]),
      nestedGroup: fieldGroup({
        targetField2: field([])
      })
    }, data)
    expect(testFieldGroup.targetField.value).toEqual(data.targetField.value)
    expect(testFieldGroup.nestedGroup.targetField2.value).toEqual(data.nestedGroup.targetField2.value)
    data.targetField.value = 'test2'
    data.nestedGroup.targetField2.value = 'nested2'
    expect(testFieldGroup.targetField.value).toEqual(data.targetField.value)
    expect(testFieldGroup.nestedGroup.targetField2.value).toEqual(data.nestedGroup.targetField2.value)
  })

  it('does not map values for unknown fields', () => {
    const data = reactive({
      unknownField: 'test'
    })
    const testFieldGroup = fieldGroup({
      targetField: field([minLength(4)])
    }, data)
    expect(testFieldGroup.targetField.value).not.toEqual(data.unknownField)
  })

  it('validates against current value for reactive object', () => {
    const data = reactive({
      targetField: 'test'
    })
    const testFieldGroup = fieldGroup({
      targetField: field([minLength(4)])
    }, data)
    expect(testFieldGroup.validate('targetField')).toBe(true)
    data.targetField = 'tes'
    expect(testFieldGroup.validate('targetField')).toBe(false)
  })

  it('validates against current value for refs object', () => {
    const data = {
      targetField: ref('test')
    }
    const testFieldGroup = fieldGroup({
      targetField: field([minLength(4)])
    }, data)
    expect(testFieldGroup.validate('targetField')).toBe(true)
    data.targetField.value = 'tes'
    expect(testFieldGroup.validate('targetField')).toBe(false)
  })

})
