import { email } from '../../src'

describe('email validator', () => {

  const validEmails = [
    'email@example.com',
    'firstname.lastname@example.com',
    'email@subdomain.example.com',
    'firstname+lastname@example.com',
    'email@123.123.123.123',
    '1234567890@example.com',
    'email@example-one.com',
    '_______@example.com',
    'email@example.name',
    'email@example.museum',
    'email@example.co.jp',
    'firstname-lastname@example.com'
  ]

  const invalidEmails = [
    'plainaddress',
    '#@%^%#$@#$@#.com',
    '@example.com',
    'Joe Smith <email@example.com>',
    'email.example.com',
    'email@example@example.com',
    '.email@example.com',
    'email.@example.com',
    'email..email@example.com',
    'email@example.com (Joe Smith)',
    'email@-example.com',
    'email@example..com',
    'Abc..123@example.com'
  ]

  validEmails.forEach(value => {
    it(`returns true when valid email: ${value}`, () => {
      expect(email().execute(value)).toBe(true)
    })
  })

  invalidEmails.forEach(value => {
    it(`returns false when invalid email: ${value}`, () => {
      expect(email().execute(value)).toBe(false)
    })
  })

  it('provides default message', () => {
    const validator = email()
    expect(validator.message).toBe('Invalid e-mail')
  })

  it('uses custom message', () => {
    const validator = email('custom message')
    expect(validator.message).toBe('custom message')
  })

})