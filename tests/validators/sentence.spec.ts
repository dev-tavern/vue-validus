import { sentences } from '../../src'

describe('email validator', () => {

  const validSentences = [
    'Hello.',
    'Hello my name is tom.',
    'Hello, my name is tom @ tom.com. I live a in a new world.',
    'I thought it was all fake, for the show. I thought it was all fake, for the show. I thought it was all fake, for the show.',
    'I thought it was all fake, for the show! I thought it was all fake, for the show? I thought it was all fake, for the show.'
  ]

  const invalidSentences = [
    'asdf ASDF',
    '. Whats up',
    'Yo)',
    'I thought it was all fake, for the show ',
    'this is totally cool,'
  ]

  validSentences.forEach(value => {
    it(`returns true when valid sentences: ${value}`, () => {
      expect(sentences().execute(value)).toBe(true)
    })
  })

  invalidSentences.forEach(value => {
    it(`returns false when invalid sentences: ${value}`, () => {
      expect(sentences().execute(value)).toBe(false)
    })
  })

  it('provides default message', () => {
    const validator = sentences()
    expect(validator.message).toBe('Must be a sentence with punctuation')
  })

  it('uses custom message', () => {
    const validator = sentences('custom message')
    expect(validator.message).toBe('custom message')
  })

})
