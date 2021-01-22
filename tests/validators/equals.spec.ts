import { ref } from 'vue'
import { equals, field } from '../../src'

describe('equals validator', () => {

  it('returns true when equals null', () => {
    expect(equals(null).execute(null)).toBe(true)
  })

  it('returns true when equals undefined', () => {
    expect(equals(undefined).execute(undefined)).toBe(true)
  })

  it('returns true when equals number', () => {
    expect(equals(1).execute(1)).toBe(true)
  })

  it('returns true when equals number with decimal', () => {
    expect(equals(1.10).execute(1.10)).toBe(true)
  })

  it('returns true when equals string', () => {
    expect(equals('test').execute('test')).toBe(true)
  })

  // it('returns true when equals array', () => {
  //   expect(equals([1, 2, 3]).execute([1, 2, 3])).toBe(true)
  // })

  //   it('returns true when equals object', () => {
  //     expect(equals(2).execute([1, 2, 3])).toBe(false)
  //   })

  it('returns false when not eqauls null', () => {
    expect(equals(null).execute('test')).toBe(false)
  })

  it('returns false when not eqauls undefined', () => {
    expect(equals(undefined).execute('test')).toBe(false)
  })

  it('returns false when not eqauls number', () => {
    expect(equals(1).execute(2)).toBe(false)
  })

  it('returns false when not eqauls number with decimal', () => {
    expect(equals(1.10).execute(1.11)).toBe(false)
  })

  it('returns false when not eqauls string', () => {
    expect(equals('test').execute('test1')).toBe(false)
  })

  // it('field has error message when invalid', () => {
  //   const validator = equals('invalid')
  //   const testField = field('test', [validator])
  //   testField.validate()
  //   expect(testField.errorMessages).toContain(validator.message)
  // })

  it('returns true when equals ref value', () => {
    const testRef = ref('test')
    const validator = equals(testRef)
    expect(validator.execute('test')).toBe(true)
  })

  it('returns true when equals ref value (after change)', () => {
    const testRef = ref('')
    const validator = equals(testRef)
    testRef.value = 'test'
    expect(validator.execute('test')).toBe(true)
  })

  it('returns false when not equals ref value', () => {
    const testRef = ref('test')
    const validator = equals(testRef)
    expect(validator.execute('test1')).toBe(false)
  })

  it('returns false when not equals ref value (after change)', () => {
    const testRef = ref('test')
    const validator = equals(testRef)
    testRef.value = 'test1'
    expect(validator.execute('test')).toBe(false)
  })

  it('returns true when equals Field', () => {
    const testField = field([], 'test')
    const validator = equals(testField)
    expect(validator.execute('test')).toBe(true)
  })

  it('returns true when equals Field (after change)', () => {
    const testField = field([], '')
    const validator = equals(testField)
    testField.value = 'test'
    expect(validator.execute('test')).toBe(true)
  })

  it('returns false when not equals Field', () => {
    const testField = field([], 'test')
    const validator = equals(testField)
    expect(validator.execute('test1')).toBe(false)
  })

  it('returns false when not equals Field (after change)', () => {
    const testField = field([], 'test')
    const validator = equals(testField)
    testField.value = 'test1'
    expect(validator.execute('test')).toBe(false)
  })

  it('provides default message', () => {
    const validator = equals('test')
    expect(validator.message).toBe('Does not match')
  })

  it('uses custom message', () => {
    const validator = equals('test', 'custom message')
    expect(validator.message).toBe('custom message')
  })

})