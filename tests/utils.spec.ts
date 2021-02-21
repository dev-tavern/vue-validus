import { field, fieldGroup, toPlainObject } from '../src'
import { getFromFields, getValueFromFields } from '../src/utils'

const fields = {
  testField1: field([], 'test1'),
  nestedGroup1: fieldGroup({
    nestedField1: field([], 'nested1'),
    nestedGroup2: fieldGroup({
      nestedField2: field([], 'nested2')
    })
  })
}
const testFieldGroup = fieldGroup(fields)

describe('utils.toPlainObject', () => {

  it('converts FieldGroup to plain key:value object', () => {
    const obj = toPlainObject(testFieldGroup)
    expect(obj.testField1).toBe('test1')
    expect(obj.nestedGroup1.nestedField1).toBe('nested1')
    expect(obj.nestedGroup1.nestedGroup2.nestedField2).toBe('nested2')
  })

})

describe('utils.getFromFields', () => {

  it('retrieves field by name', () => {
    expect(getFromFields(fields, 'testField1')).toBe(fields.testField1)
  })

  it('retrieves field group by name', () => {
    expect(getFromFields(fields, 'nestedGroup1')).toBe(fields.nestedGroup1)
  })

  it('retrieves nested field by path', () => {
    expect(getFromFields(fields, 'nestedGroup1.nestedField1')).toBe(fields.nestedGroup1.nestedField1)
    expect(getFromFields(fields, 'nestedGroup1.nestedGroup2.nestedField2')).toBe(fields.nestedGroup1.nestedGroup2.nestedField2)
  })

  it('returns null for unknown field', () => {
    expect(getFromFields(fields, 'unknownField')).toBe(null)
  })

  it('returns null for unknown nested field', () => {
    expect(getFromFields(fields, 'nestedGroup1.unknownField')).toBe(null)
    expect(getFromFields(fields, 'unknownGroup.unknownField')).toBe(null)
  })

})

describe('utils.getValueFromFields', () => {

  it('retrieves field value by name', () => {
    expect(getValueFromFields(fields, 'testField1')).toBe(fields.testField1.value)
  })

  it('returns null for field group', () => {
    expect(getValueFromFields(fields, 'nestedGroup1')).toBe(null)
  })

  it('retrieves nested field value by path', () => {
    expect(getValueFromFields(fields, 'nestedGroup1.nestedField1')).toBe(fields.nestedGroup1.nestedField1.value)
    expect(getValueFromFields(fields, 'nestedGroup1.nestedGroup2.nestedField2')).toBe(fields.nestedGroup1.nestedGroup2.nestedField2.value)
  })

  it('returns null for unknown field', () => {
    expect(getValueFromFields(fields, 'unknownField')).toBe(null)
  })

  it('returns null for unknown nested field', () => {
    expect(getValueFromFields(fields, 'nestedGroup1.unknownField')).toBe(null)
    expect(getValueFromFields(fields, 'unknownGroup.unknownField')).toBe(null)
  })

})
