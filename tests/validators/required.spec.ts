import { required } from '../../src'

describe('required validator', () => {

  it('returns false when null', () => {
    expect(required().execute(null)).toBe(false)
  })

  it('returns false when undefined', () => {
    expect(required().execute(undefined)).toBe(false)
  })

  it('returns false when false', () => {
    expect(required().execute(false)).toBe(false)
  })

  it('returns false when whitespace string', () => {
    expect(required().execute('    ')).toBe(false)
  })

  it('returns false when empty string', () => {
    expect(required().execute('')).toBe(false)
  })

  it('returns false when empty array', () => {
    expect(required().execute([])).toBe(false)
  })

  it('returns false when empty object', () => {
    expect(required().execute({})).toBe(false)
  })

  it('returns false when empty date', () => {
    expect(required().execute(new Date(''))).toBe(false)
  })

  it('returns false when 0', () => {
    expect(required().execute(0)).toBe(false)
  })

  it('returns true when true', () => {
    expect(required().execute(true)).toBe(true)
  })

  it('returns true when non-empty string', () => {
    expect(required().execute('test')).toBe(true)
  })

  it('returns true when non-empty array', () => {
    expect(required().execute([1])).toBe(true)
  })

  it('returns true when non-empty object', () => {
    expect(required().execute({ test: 'test' })).toBe(true)
  })

  it('returns true when non-empty date', () => {
    expect(required().execute(new Date())).toBe(true)
  })

  it('returns true when non-zero number', () => {
    expect(required().execute(1)).toBe(true)
    expect(required().execute(-1)).toBe(true)
  })

  it('provides default message', () => {
    const validator = required()
    expect(validator.message).toBe('Required')
  })

  it('uses custom message', () => {
    const validator = required('custom message')
    expect(validator.message).toBe('custom message')
  })

})
