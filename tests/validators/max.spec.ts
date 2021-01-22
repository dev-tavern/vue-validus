import { max } from '../../src'

describe('max validator', () => {

  it('returns true when no value (null)', () => {
    expect(max(2).execute(null)).toBe(true)
  })

  it('returns true when no value (undefined)', () => {
    expect(max(2).execute(undefined)).toBe(true)
  })

  it('returns true when value less than max', () => {
    expect(max(2).execute(1)).toBe(true)
  })

  it('returns true when value equal max', () => {
    expect(max(2).execute(2)).toBe(true)
  })

  it('returns false when value greater than max', () => {
    expect(max(2).execute(3)).toBe(false)
  })

  it('provides default message', () => {
    const validator = max(2)
    expect(validator.message).toBe('Exceeds maximum of 2')
  })

  it('uses custom message', () => {
    const validator = max(2, 'custom message')
    expect(validator.message).toBe('custom message')
  })

})