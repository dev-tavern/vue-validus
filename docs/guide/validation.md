# Validation

::: tip
View the [API Reference](/api/#validators) for further details on creating and using Validator objects.
:::

Validator objects are applied to fields for determining the validity of the field value.  These are invoked upon execution of a field's validate function.

All validators will have a validator `name` which will be added to a field's `errors` array when the field's value is not passing the validation, and an `execute` function which is invoked to perform the actual validation.  Optionally, validators may define a `message` which will be added to a field's `errorMessages` array when the  validation is not passed.  All built-in validators will provide a default message for this purpose, and allow for providing a custom message to override the default.

## Built-in

For details of each built-in validator, see:  [Validators: Built-in](/api/#validators-built-in)

The following validators are provided:
* email
* equals
* equalsByFieldName
* match
* max
* maxLength
* min
* minLength
* numeric
* required
* requiredIf
* word
* sentences

## Custom

In addition to the above, you can easily create and use your own validators.  For details on how to create custom validators, see:  [Validators: Custom](/api/#validators-custom)

## Overriding Messages

If you want to use a field's `errorMessages` for display purposes, you may likely want to control the message text that is used for the built-in validators.  As mentioned, each built-in validator allows for providing a custom message argument for this purpose.  

For example, the `required` and `max` validator messages can be customized like this:
```typescript
import { field, max, required } from 'vue-validus'
const field1 = field([required('custom message 1')])
const field2 = field([max(5, 'custom message 2')], 6)
field1.validate()
field2.validate()
field1.errorMessages // ['custom message 1']
field2.errorMessages // ['custom message 2']
```

If you have many fields across multiple components for which you want to leverage the same validation messages, you may consider defining your own validators to accomplish this.  For example:

```typescript
// app-validators.ts
import { max as vMax, required as vRequired, Validator } from 'vue-validus'
export const required: Validator = vRequired('custom message 1')
export const max = (maximum: number): Validator => vMax(maximum, 'custom message 2')
```
```typescript
// component
import { field } from 'vue-validus'
import { max, required } from './app-validators'
const field1 = field([required])
const field2 = field([max(5)], 6)
field1.validate()
field2.validate()
field1.errorMessages // ['custom message 1']
field2.errorMessages // ['custom message 2']
```