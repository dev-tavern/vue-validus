import { min } from '../../src'

describe('min validator', () => {

  it('returns true when no value (null)', () => {
    expect(min(2).execute(null)).toBe(true)
  })

  it('returns true when no value (undefined)', () => {
    expect(min(2).execute(undefined)).toBe(true)
  })

  it('returns true when value greater than min', () => {
    expect(min(2).execute(3)).toBe(true)
  })

  it('returns true when value equal min', () => {
    expect(min(2).execute(2)).toBe(true)
  })

  it('returns false when value less than min', () => {
    expect(min(2).execute(1)).toBe(false)
  })

  it('provides default message', () => {
    const validator = min(2)
    expect(validator.message).toBe('Does not meet the minimum of 2')
  })

  it('uses custom message', () => {
    const validator = min(2, 'custom message')
    expect(validator.message).toBe('custom message')
  })

})