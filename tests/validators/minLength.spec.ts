import { minLength } from '../../src'

describe('minLength validator', () => {

  it('returns true when no value', () => {
    expect(minLength(2).execute(null)).toBe(true)
  })

  it('returns true when value greater than min', () => {
    expect(minLength(2).execute([1, 2, 3])).toBe(true)
  })

  it('returns true when value equal min', () => {
    expect(minLength(2).execute([1, 2])).toBe(true)
  })

  it('returns false when value less than min', () => {
    expect(minLength(2).execute([1])).toBe(false)
  })

  it('returns true when string value length greater than min', () => {
    expect(minLength(2).execute('123')).toBe(true)
  })

  it('returns true when string value length equal to min', () => {
    expect(minLength(2).execute('12')).toBe(true)
  })

  it('returns false when string value length less than min', () => {
    expect(minLength(2).execute('1')).toBe(false)
  })

  it('returns true when object keys length greater than min', () => {
    expect(minLength(2).execute({ prop1: '1', prop2: '2', prop3: '3' })).toBe(true)
  })

  it('returns true when object keys length equal min', () => {
    expect(minLength(2).execute({ prop1: '1', prop2: '2' })).toBe(true)
  })

  it('returns false when object keys length less than min', () => {
    expect(minLength(2).execute({ prop1: '1' })).toBe(false)
  })

  it('provides default message', () => {
    const validator = minLength(2)
    expect(validator.message).toBe('Does not meet the minimum length of 2')
  })

  it('uses custom message', () => {
    const validator = minLength(2, 'custom message')
    expect(validator.message).toBe('custom message')
  })

})