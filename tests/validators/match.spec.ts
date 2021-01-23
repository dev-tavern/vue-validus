import { match } from '../../src'

describe('match validator', () => {

  const StringPattern = '^abc$'
  const RegExpPattern = /^abc$/

  it('returns true when matching string pattern', () => {
    expect(match(StringPattern).execute('abc')).toBe(true)
  })

  it('returns false when not matching string pattern', () => {
    expect(match(StringPattern).execute('abcd')).toBe(false)
  })

  it('returns true when matching RegExp pattern', () => {
    expect(match(RegExpPattern).execute('abc')).toBe(true)
  })

  it('returns false when not matching RegExp pattern', () => {
    expect(match(RegExpPattern).execute('abcd')).toBe(false)
  })

  it('provides default message', () => {
    const validator = match(StringPattern)
    expect(validator.message).toBe('Does not meet requirement')
  })

  it('uses custom message', () => {
    const validator = match(StringPattern, 'custom message')
    expect(validator.message).toBe('custom message')
  })

})

describe('match validator (non-string)', () => {

  const StringPattern = '^[1-9]+$'
  const RegExpPattern = /^[1-9]+$/

  it('returns true when matching string pattern', () => {
    expect(match(StringPattern).execute(123)).toBe(true)
  })

  it('returns false when not matching string pattern', () => {
    expect(match(StringPattern).execute(12.23)).toBe(false)
  })

  it('returns true when matching RegExp pattern', () => {
    expect(match(RegExpPattern).execute(123)).toBe(true)
  })

  it('returns false when not matching RegExp pattern', () => {
    expect(match(RegExpPattern).execute(12.23)).toBe(false)
  })
})
