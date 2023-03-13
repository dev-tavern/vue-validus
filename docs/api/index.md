# Field

## Field: Creation

### field

Create a Field with the provided validators and optional value.  A field's value will be validated against the list of provided validators.  The field is considered invalid if at least one validator is not passing. The provided field value can be a Vue Ref object, in which case the value of this field and the Ref will be kept in sync.  When creating a field to be used within a field group that uses a data source object, there is no need to provide a fieldValue if it is going to come from the data source object (any fieldValue provided would be overriden in this case).

**Signature:**
```typescript
function field<T>(validators: Validator[], fieldValue?: T | Ref<T>): Field<T>
```

**Parameters:**
**Parameter**|**Type**|**Description**
:-----|:-----|:-----
validators | [Validator[]](#validators) | Array of validators which the field's value will be validated against
fieldValue | T \| Ref\<T\> | (Optional) Initial value of the field.  If a Vue Ref is provided, the field value and the ref value will be kept in sync

## Field: Properties

### value

- **Type**: `T`
- **Details**: The current value of the field, is provided to validators upon validation.  If this is set with a Vue ref, the field and ref will maintain the same value (if the ref value changes, the field value will reflect the change as well).

### invalid

- **Type**: `boolean`
- **Details**: If the field is currently considered invalid (did not pass latest validation).  `true` if invalid, `false` if valid.

### errors

- **Type**: `string[]`
- **Details**: List of failing validator names.  If field is valid, the array will be empty.

```typescript
const myField = field([minLength(6)], 'short')
myField.validate()
myField.errors // ['minLength']
```

### errorMessages

- **Type**: `string[]`
- **Details**: List of failing validator messages.  If field is valid, the array will be empty.

```typescript
const myField = field([minLength(6)], 'short')
myField.validate()
myField.errorMessages // ['Does not meet the minimum length of 6'] (deault message)
```

```typescript
const myField = field([minLength(6, 'Minimum length: 6')], 'short')
myField.validate()
myField.errorMessages // ['Minimum length: 6'] (custom message)
```

## Field: Methods

### validate

Validate the current value of the field against all validators, returns `true` if valid and `false` if invalid.

**Signature:**
```typescript
function validate(): boolean
```

### clear

Remove all errors (`errors` and `errorMessages`) and set the field to be valid.
The value of the field will not be changed.

**Signature:**
```typescript
function clear(): void
```

### hasError

Check if the field contains an error matching the provided validator name.

**Signature:**
```typescript
function hasError(name: string): boolean
```

**Parameters:**
**Parameter**|**Type**|**Description**
:-----|:-----|:-----
name | string | The name of a validator to check

```typescript
const myField = field([minLength(6)], 'short')
myField.validate()
myField.hasError('minLength') // true
```

### addValidator

Add a validator to the existing array of validators on the field.

**Signature:**
```typescript
function addValidator(validator: Validator): void
```

**Parameters:**
**Parameter**|**Type**|**Description**
:-----|:-----|:-----
validator | [Validator](#validators) | The validator to add

```typescript
const myField = field([required()], 'short')
myField.validate() // true
myField.addValidator(minLength(6))
myField.validate() // false
```

### removeValidator

Remove a validator from the existing array of validators on the field.

**Signature:**
```typescript
function removeValidator(validator: string | Validator): void
```

**Parameters:**
**Parameter**|**Type**|**Description**
:-----|:-----|:-----
validator | string \| [Validator](#validators) | The name of the validator to remove or the validator object itself

# FieldGroup

## FieldGroup: Creation

### fieldGroup

Create a group of fields / field groups which can be validated and inspected via a single object.  
If a data object is provided, the values of the data object will be applied to the properties (field and/or field groups) of this field group.  If the provided data object is a Vue reactive object or object containing Vue refs, the values within the field group will remain in sync with the provided data object.

**Signature:**
```typescript
function fieldGroup<T = any>(
  fields: FieldGroupProps<T>,
  data?: Record<string, unknown>
): FieldGroupType<T>
```

**Parameters:**
**Parameter**|**Type**|**Description**
:-----|:-----|:-----
fields | *(FieldGroupProps)* | FieldGroupProps are any object containing properties of Fields and/or FieldGroups (can be nested)
data | Record<string, unknown> | (Optional) Object containing the data for the field group

```typescript
const form = fieldGroup({
  myField: field([minLength(5)])
})
```
```typescript
const myField = field([minLength(5)])
const form = fieldGroup({
  myField
})
```
```typescript
const data = reactive({
  field1: '', 
  nestedGroup: {
    field2: ''
  }
})
const form = fieldGroup({
  field1: field([minLength(5)]),
  nestedGroup: fieldGroup({
    field2: field([required()])
  })
}, data)
```
```typescript
const data = {
  field1: ref(''),
  nestedGroup: {
    field2: ref('')
  }
}
const form = fieldGroup({
  field1: field([minLength(5)]),
  nestedGroup: fieldGroup({
    field2: field([required()])
  })
}, data)
```

## FieldGroup: Properties

### dynamic properties

- **Type**: [key: string]: [Field](#field) \| [FieldGroup](#fieldgroup)
- **Details**: The fields provided to the fieldGroup factory function, as properties of the field group.  This is to easily facilitate field access within components and templates (e.g. `v-model="myfieldGroup.myField.value"`)

```typescript
const form = fieldGroup({
  myField: field([minLength(5)])
})
```
```html
<input
  v-model="form.myField.value"
  @blur="form.myField.validate()"
  type="text"
/>
```

```typescript
const data = reactive({
  field1: '', 
  nestedGroup: {
    field2: ''
  }
})
const form = fieldGroup({
  field1: field([minLength(5)]),
  nestedGroup: fieldGroup({
    field2: field([required()])
  })
}, data)
```
```html
<input
  v-model="data.nestedGroup.field2"
  @blur="form.nestedGroup.field2.validate()"
  type="text"
/>
```

### invalid

- **Type**: `boolean`
- **Details**: If the field group is currently considered invalid (did not pass latest validation).  `true` if any fields / field groups are invalid, `false` if all are valid.

## FieldGroup: Methods

### validate

Validate all fields / field groups within the field group, returns `true` if valid and `false` if invalid.  Optionally, a field name can be provided to only validate a specific member field / field group.

**Signature:**
```typescript
function validate(fieldName?: string): boolean
```

```typescript
const form = fieldGroup({
  field1: field([minLength(5)]),
  nestedGroup: fieldGroup({
    field2: field([required()])
  })
})
form.validate() // validate all fields / field groups
form.validate('field1') // validate a field
form.validate('nestedGroup') // validate a field group
form.validate('nestedGroup.field2') // validate a nested field
```

### clear

Remove all errors and set the field group to be valid.

**Signature:**
```typescript
function clear(): void
```

### get

Get a field / field group by name (can be nested).

**Signature:**
```typescript
function get(fieldName: string): Field | FieldGroupType | null
```

```typescript
const form = fieldGroup({
  field1: field([minLength(5)]),
  nestedGroup: fieldGroup({
    field2: field([required()])
  })
})
form.get('field1') // get a field
form.get('nestedGroup') // get a field group
form.get('nestedGroup.field2') // get a nested field
```

### getErrorFields

Get all invalid fields / field groups within the field group.

**Signature:**
```typescript
function getErrorFields(): (Field | FieldGroupType)[]
```

### getValue

Get a field value by name (can be nested).

**Signature:**
```typescript
function getValue(fieldName: string): any
```

```typescript
const form = fieldGroup({
  field1: field([minLength(5)], 'A'),
  nestedGroup: fieldGroup({
    field2: field([required()], 'B')
  })
})
form.getValue('field1') // 'A'
form.getValue('nestedGroup.field2') // 'B'
```

# Validators

## Validators: Built-In

### email

Validates that a field value is a valid e-mail format.

- **Name**: email
- **Default message**: Invalid e-mail

**Signature:**
```typescript
function email(message?: string): Validator
```

**Parameters:**
**Parameter**|**Type**|**Description**
:-----|:-----|:-----
message | string | (Optional) Custom error message when invalid (will override default message)

```typescript
import { field, email } from 'vue-validus'
const field1 = field([email()])
const field2 = field([email('custom message')])
```

### equals

Validates that a field value is equal to the provided value.
If the provided equalTo value is a Vue Ref or another Field, then 
it will use the current value of those objects at the time of validation.

- **Name**: equals
- **Default message**: Does not match

**Signature:**
```typescript
function equals(equalTo: any, message?: string): Validator
```

**Parameters:**
**Parameter**|**Type**|**Description**
:-----|:-----|:-----
equalTo | any | The value this field should be equal to.  May be a string, number, Vue Ref, or another Field object.
message | string | (Optional) Custom error message when invalid (will override default message)

```typescript
import { field, equals } from 'vue-validus'
const field1 = field([equals('abcd')])
const field2 = field([equals('abcd', 'custom message')])
```
```typescript
import { ref } from 'vue'
import { field, equals } from 'vue-validus'
const data = ref('test')
const field1 = field([equals(data)])
```
```typescript
import { field, equals, required } from 'vue-validus'
const password = field([required()])
const confirmPassword = field([equals(password)])
```

### equalsByFieldName

Validates that a field value is equal to the value of a target Field identified by the provided name.
The field and target field must be members of the same root field group 
(the fields may be nested at different levels within the root field group).

- **Name**: equalsByFieldName
- **Default message**: Does not match

**Signature:**
```typescript
function equalsByFieldName(equalToFieldName: string, message?: string): Validator
```

**Parameters:**
**Parameter**|**Type**|**Description**
:-----|:-----|:-----
equalToFieldName | string | The name of the target Field containing the value to match.
message | string | (Optional) Custom error message when invalid (will override default message)

```typescript
import { field, equalsByFieldName } from 'vue-validus'
const field1 = field([])
const field2 = field([equalsByFieldName('field1')])
```
```typescript
import { field, fieldGroup, equalsByFieldName } from 'vue-validus'
const form = fieldGroup({
  field1: field([equalsByFieldName('nestedGroup.field2')]),
  nestedGroup: fieldGroup({
    field2: field([required()])
  })
})
```

### match

Validates that a field value matches the provided regular expression.

- **Name**: match
- **Default message**: Does not meet requirement

**Signature:**
```typescript
function match(regexp: string | RegExp, message?: string): Validator
```

**Parameters:**
**Parameter**|**Type**|**Description**
:-----|:-----|:-----
regexp | string \| RegExp | The regular expression to match against.
message | string | (Optional) Custom error message when invalid (will override default message)

```typescript
import { field, match } from 'vue-validus'
const stringPattern = '^abc$'
const field1 = field([match(stringPattern)])
```
```typescript
import { field, match } from 'vue-validus'
const regExpPattern = /^abc$/
const field1 = field([match(regExpPattern)])
```

### max

Validates that a field value is no greater than the provided maximum.

- **Name**: max
- **Default message**: Exceeds maximum of `${maximum}`

**Signature:**
```typescript
function max(maximum: number, message?: string): Validator
```

**Parameters:**
**Parameter**|**Type**|**Description**
:-----|:-----|:-----
maximum | number | The maximum value allowed.
message | string | (Optional) Custom error message when invalid (will override default message)

```typescript
import { field, max } from 'vue-validus'
const field1 = field([max(10)])
const field2 = field([max(10, 'Value cannot be greater than 10'])
```

### maxLength

Validates that a field value length is no greater than the provided maximum.

- **Name**: maxLength
- **Default message**: Exceeds maximum length of `${maximum}`

**Signature:**
```typescript
function maxLength(maximum: number, message?: string): Validator
```

**Parameters:**
**Parameter**|**Type**|**Description**
:-----|:-----|:-----
maximum | number | The maximum length allowed.
message | string | (Optional) Custom error message when invalid (will override default message)

```typescript
import { field, maxLength } from 'vue-validus'
const field1 = field([maxLength(5)])
const field2 = field([maxLength(5, 'Cannot exceed 5 characters')], 'Sample Input Value')
```
```typescript
import { field, maxLength } from 'vue-validus'
const field1 = field([maxLength(2)])
const field2 = field([maxLength(2, 'Cannot exceed 2 items')], ['Sample', 'Input', 'Value'])
```

### min

Validates that a field value is no less than the provided minimum.

- **Name**: min
- **Default message**: Does not meet the minimum of `${minimum}`

**Signature:**
```typescript
function min(minimum: number, message?: string): Validator
```

**Parameters:**
**Parameter**|**Type**|**Description**
:-----|:-----|:-----
minimum | number | The minimum value allowed.
message | string | (Optional) Custom error message when invalid (will override default message)

```typescript
import { field, min } from 'vue-validus'
const field1 = field([min(10)])
const field2 = field([min(10, 'Value cannot be less than 10'])
```

### minLength

Validates that a field value length is no less than the provided minimum.

- **Name**: minLength
- **Default message**: Does not meet the minimum length of `${minimum}`

**Signature:**
```typescript
function minLength(minimum: number, message?: string): Validator
```

**Parameters:**
**Parameter**|**Type**|**Description**
:-----|:-----|:-----
minimum | number | The minimum length allowed.
message | string | (Optional) Custom error message when invalid (will override default message)

```typescript
import { field, minLength } from 'vue-validus'
const field1 = field([minLength(5)])
const field2 = field([minLength(5, 'Must be at least 5 characters')], 'Sample Input Value')
```
```typescript
import { field, minLength } from 'vue-validus'
const field1 = field([minLength(2)])
const field2 = field([minLength(2, 'Must have at least 2 items')], ['Sample', 'Input', 'Value'])
```

### numeric

Validates that a field value is numeric.  Accepts numbers and numbers with decimals, as well as string representations of numeric values.

- **Name**: numeric
- **Default message**: Must be a number

**Signature:**
```typescript
function numeric(message?: string): Validator
```

**Parameters:**
**Parameter**|**Type**|**Description**
:-----|:-----|:-----
message | string | (Optional) Custom error message when invalid (will override default message)

```typescript
import { field, numeric } from 'vue-validus'
const field1 = field([numeric()])
const field2 = field([numeric('Numbers only')])
```

### required

Validates that a field has a value.

- **Name**: required
- **Default message**: Required

**Signature:**
```typescript
function required(message?: string): Validator
```

**Parameters:**
**Parameter**|**Type**|**Description**
:-----|:-----|:-----
message | string | (Optional) Custom error message when invalid (will override default message)

```typescript
import { field, required } from 'vue-validus'
const field1 = field([required()])
const field2 = field([required('This field is required.')])
```

### requiredIf

Validates that a field has a value, if the provided condition is met.

- **Name**: required
- **Default message**: Required

**Signature:**
```typescript
function requiredIf<ContextType = any>(
  condition: ValidatorCondition<ContextType>, 
  message?: string
): Validator
```

**Parameters:**
**Parameter**|**Type**|**Description**
:-----|:-----|:-----
condition | [ValidatorCondition](#validatorcondition) | The condition to be evaluated for determining if the field is required.  This can be a simple boolean value, a Vue Ref boolean, or a function which takes a root FieldGroup argument (if the field is a member of a field group) and returns a boolean representing if the field is required.
message | string | (Optional) Custom error message when invalid (will override default message)

::: tip Note
When a function is used for the condition, if a root FieldGroup object is provided as an argument to the function, the provided FieldGroup object will only make available the [get](#get) method and its [dynamic properties](#dynamic-properties).
:::

```typescript
import { field, requiredIf } from 'vue-validus'
const condition = true
const field1 = field([requiredIf(condition)])
field1.validate() // false (invalid - required)
```
```typescript
import { ref } from 'vue'
import { field, requiredIf } from 'vue-validus'
const condition = ref(true)
const field1 = field([requiredIf(condition)])
field1.validate() // false (invalid - required)
condition.value = false
field1.validate() // true (valid - not required)
```
```typescript
import { reactive, toRef } from 'vue'
import { field, requiredIf } from 'vue-validus'
const data = reactive({ someValue: true })
const condition = toRef(data, 'someValue')
const field1 = field([requiredIf(condition)])
field1.validate() // false (invalid - required)
data.someValue = false
field1.validate() // true (valid - not required)
```
```typescript
import { computed, ref } from 'vue'
import { field, requiredIf } from 'vue-validus'
const data = ref('yes')
const condition = computed(() => data.value === 'yes')
const field1 = field([requiredIf(condition)])
field1.validate() // false (invalid - required)
data.value = 'no'
field1.validate() // true (valid - not required)
```
```typescript
import { computed, reactive } from 'vue'
import { field, requiredIf } from 'vue-validus'
const data = reactive({ someValue: 'yes' })
const condition = computed(() => data.someValue === 'yes')
const field1 = field([requiredIf(condition)])
field1.validate() // false (invalid - required)
data.someValue = 'no'
field1.validate() // true (valid - not required)
```
```typescript
import { ref } from 'vue'
import { field, requiredIf } from 'vue-validus'
const data = ref('yes') // could use reactive object as well
const condition = () => data.value === 'yes'
const field1 = field([requiredIf(condition)])
field1.validate() // false (invalid - required)
data.value = 'no'
field1.validate() // true (valid - not required)
```
```typescript
import { field, fieldGroup, FieldGroupType, requiredIf } from 'vue-validus'
const condition = (context?: FieldGroupType) => {
  if (context && context.field1 && context.field1.value === 'yes') {
    return true
  }
  return false
}
const form = fieldGroup({
  field1: field([], 'yes'),
  field2: field([requiredIf(condition)])
})
form.field2.validate() // false (invalid - required)
form.field1.value = 'no'
form.field2.validate() // true (valid - not required)
```
Note that when supplying a condition function, the data it may leverage does not necessarily need to be one of a reactive object (ref or reactive).  For example:
```typescript
import { field, requiredIf } from 'vue-validus'
let data = 'yes'
const condition = () => data === 'yes'
const field1 = field([requiredIf(condition)])
field1.validate() // false (invalid - required)
data = 'no'
field1.validate() // true (valid - not required)
```

## Validators: Custom

::: tip Note
All validators must conform to the [Validator](#validator) interface.
:::

To use your own validator, you must create an object which adheres to the [Validator](#validator) interface.
The object must have a `name` property and `execute` function, and optionally a `message` property.

**Requirements**
**Parameter**|**Type**|**Description**
:-----|:-----|:-----
name | string | The name of the validator.  Will be added to a field's [errors](#errors) list when invalid.
execute | function | Function to be invoked upon validation, must return a `boolean` value.  The first argument is the `value` of the field being validated and the second (optional) argument is the `context` FieldGroup (root field group to which the field belongs).
message | string | (Optional) Custom error message when invalid.  Will be added to a field's [errorMessages](#errormessages) list when invalid.

```typescript
import { field, Validator } from 'vue-validus'
const custom: Validator = {
  name: 'custom',
  message: 'an error message',
  execute: (value) => ['valid', 'values', 'array'].includes(value)
}
const field1 = field([custom], 'invalid')
field1.validate() // false (invalid)
field1.hasError('custom') // true
field1.errorMessages // ['an error message']
field1.value = 'valid'
field1.validate() // true (valid)
field1.hasError('custom') // false
field1.errorMessages // []
```

When a validator is applied to a field which is a member of a field group, the root (outermost) FieldGroup object will be provided as the `context` argument to the validator's execute function.

```typescript
import { field, fieldGroup, Validator } from 'vue-validus'
const custom: Validator = {
  name: 'custom',
  message: 'an error message',
  execute: (value, context) => {
    if (context && context.getValue('field2') === 'yes') {
      return ['valid', 'values', 'array'].includes(value)
    }
    return true
  }
}
const field1 = field([custom], 'invalid')
const field2 = field([], 'no')
field1.validate() // true (valid - field2 is not 'yes')
field2.value = 'yes'
field1.validate() // false (invalid - field2 is 'yes' and field1's value is not in the allowed list)
```

# Typescript

## Typescript: Interfaces

### Field

```typescript
interface Field<T = any> {
  __kind: 'Field'
  value: T
  invalid: boolean
  errors: string[]
  errorMessages: string[]
  validate(): boolean
  clear(): void
  hasError(name: string): boolean
  addValidator(validator: Validator): void
  removeValidator(validator: string | Validator): void
  setTopLevel(context: FieldGroup): void
}
```

### FieldGroup

```typescript
interface FieldGroup {
  __kind: 'FieldGroup'
  fields: FieldGroupProps
  invalid: boolean
  validate(fieldName?: string): boolean
  clear(): void
  get(fieldName: string): Field | FieldGroupType | null
  getValue(fieldName: string): any
  getErrorFields(): (Field | FieldGroupType)[]
  setTopLevel(context: FieldGroup): void
}
```

### Validator

```typescript
export interface Validator<T = any, ContextType = any> {
  name: string
  message?: string
  execute(value: T, context?: FieldGroupType<ContextType>): boolean
}
```

### ValidatorCondition

```typescript
export type ValidatorCondition<T = any> = boolean | Ref<boolean> | ComputedRef<boolean> | ((context?: FieldGroupType<T> | undefined) => boolean)
```

## Typescript: Types

### FieldGroupProps

```typescript
export type FieldGroupProps<T = any> = {
  [K in keyof T]: T[K] extends Record<string, unknown> ? FieldGroupType<T[K]> : Field<T[K]>
}
```

### FieldGroupType

```typescript
export type FieldGroupType<T = any> = FieldGroup & FieldGroupProps<T>
```

# Utils

## Utility Methods

### toPlainObject

Constructs a plain object (key/value pairs) from a [FieldGroup](#fieldgroup) object.

**Signature:**
```typescript
function toPlainObject<T = any>(fieldGroup: FieldGroup): T
```

```typescript
import { field, fieldGroup, toPlainObject } from 'vue-validus'
const testFieldGroup = fieldGroup({
  testField1: field([], 'test1'),
  nestedGroup1: fieldGroup({
    nestedField1: field([], 'nested1'),
    nestedGroup2: fieldGroup({
      nestedField2: field([], 'nested2')
    })
  })
})
const obj = toPlainObject(testFieldGroup)
/* (obj)
{
  testField1: 'test1',
  nestedGroup1: {
    nestedField1: 'nested1',
    nestedGroup2: { nestedField2: 'nested2' }
  }
}
*/
```