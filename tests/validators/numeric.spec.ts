import { numeric } from '../../src'

describe('numeric validator', () => {

  it('returns true when no value (null)', () => {
    expect(numeric().execute(null)).toBe(true)
  })

  it('returns true when no value (undefined)', () => {
    expect(numeric().execute(undefined)).toBe(true)
  })

  it('returns false when string of alpha characters', () => {
    expect(numeric().execute('test')).toBe(false)
  })

  it('returns true when string of numeric characters', () => {
    expect(numeric().execute('1')).toBe(true)
  })

  it('returns false when array of alpha values', () => {
    expect(numeric().execute(['test'])).toBe(false)
  })

  it('returns true when array of numeric values', () => {
    expect(numeric().execute([1])).toBe(true)
  })

  it('returns true when number', () => {
    expect(numeric().execute(1)).toBe(true)
  })

  it('returns true when number with decimal', () => {
    expect(numeric().execute(1.1)).toBe(true)
  })

  it('provides default message', () => {
    const validator = numeric()
    expect(validator.message).toBe('Must be a number')
  })

  it('uses custom message', () => {
    const validator = numeric('custom message')
    expect(validator.message).toBe('custom message')
  })

})
