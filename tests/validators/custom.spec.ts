import { field, fieldGroup, FieldGroupType, requiredIf } from '../../src'

describe('custom validator', () => {

  it('evalutes condition with context provided', () => {
    const condition = (context?: FieldGroupType) => {
      if (context && context.getValue('field1') === 'yes') {
        return true
      }
      return false
    }
    
    const form = fieldGroup({
      field1: field([], 'yes'),
      field2: field([requiredIf(condition)])
    })
    expect(form.field2.validate()).toBe(false) // false (invalid - required)
    form.field1.value = 'no'
    expect(form.field2.validate()).toBe(true) // true (valid - not required)
  })

})
