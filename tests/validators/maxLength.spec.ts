import { maxLength } from '../../src'

describe('maxLength validator', () => {

  it('returns true when no value', () => {
    expect(maxLength(2).execute(null)).toBe(true)
  })

  it('returns true when value less than max', () => {
    expect(maxLength(2).execute([1])).toBe(true)
  })

  it('returns true when value equal max', () => {
    expect(maxLength(2).execute([1, 2])).toBe(true)
  })

  it('returns false when value greater than max', () => {
    expect(maxLength(2).execute([1, 2, 3])).toBe(false)
  })

  it('returns true when string value length less than max', () => {
    expect(maxLength(2).execute('1')).toBe(true)
  })

  it('returns true when string value length equal to max', () => {
    expect(maxLength(2).execute('12')).toBe(true)
  })

  it('returns false when string value length greater than max', () => {
    expect(maxLength(2).execute('123')).toBe(false)
  })

  it('returns true when object keys length less than max', () => {
    expect(maxLength(2).execute({ prop1: '1' })).toBe(true)
  })

  it('returns true when object keys length equal max', () => {
    expect(maxLength(2).execute({ prop1: '1', prop2: '2' })).toBe(true)
  })

  it('returns false when object keys length greater max', () => {
    expect(maxLength(2).execute({ prop1: '1', prop2: '2', prop3: '3' })).toBe(false)
  })

  it('provides default message', () => {
    const validator = maxLength(2)
    expect(validator.message).toBe('Exceeds maximum length of 2')
  })

  it('uses custom message', () => {
    const validator = maxLength(2, 'custom message')
    expect(validator.message).toBe('custom message')
  })

})