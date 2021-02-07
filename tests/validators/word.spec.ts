import { word } from '../../src'

describe('word validator', () => {

  const validLetters = [
    'asdf',
    'ASDF',
    'asdfASDF',
    'helloWorld'
  ]

  const invalidLetters = [
    'asdf ASDF',
    ' asdf',
    '!@#asdf',
    'ASDFasdf!',
    'ASDF!asdf',
    '!!@#$%^&*()__+',
    'hello world.'
  ]

  validLetters.forEach(value => {
    it(`returns true when valid letters: ${value}`, () => {
      expect(word().execute(value)).toBe(true)
    })
  })

  invalidLetters.forEach(value => {
    it(`returns false when invalid letters: ${value}`, () => {
      expect(word().execute(value)).toBe(false)
    })
  })

  it('provides default message', () => {
    const validator = word()
    expect(validator.message).toBe('Must be a word')
  })

  it('uses custom message', () => {
    const validator = word('custom message')
    expect(validator.message).toBe('custom message')
  })

})
