# vue-validus

[![License][license-image]][license-url]
[![NPM][npm-image]][npm-url]
[![codecov](https://codecov.io/gh/dev-tavern/vue-validus/branch/main/graph/badge.svg?token=IFCU4CBZWR)](https://codecov.io/gh/dev-tavern/vue-validus)
[![dev-tavern](https://circleci.com/gh/dev-tavern/vue-validus.svg?style=svg)](https://circleci.com/gh/dev-tavern/vue-validus)

> Extensible, lightweight validation library for Vue 3

## Get Started

View the [documentation](https://vue-validus.devtavern.com) for a complete guide, including examples and API reference.

### Install
```bash
# install with npm
npm install vue-validus --save
# install with yarn
yarn add vue-validus --save
```

### Usage

Below is a simple example of one approach for leveraging vue-validus for validation, for more detailed examples and additional approaches, please visit the [documentation](https://vue-validus.devtavern.com).  This example will use Vue refs as the source for the field values, though you could also use a reactive object or just the fields themselves without separate value properties.

#### Composition API

```typescript
import { defineComponent, ref } from 'vue'
import { field, fieldGroup, required } from 'vue-validus'
export default defineComponent({
  setup() {
    // example: field group containing fields with values sourced from refs
    const username = ref('')
    const password = ref('')
    const form = fieldGroup({
      username: field([required()], username),
      password: field([required()], password)
    })
    // example: validate entire group at once and check result
    const handleSubmit = () => {
      form.validate()
      if (!form.invalid) {
        // submit...
      }
    }
    return { username, password, form, handleSubmit }
  }
})
```
At this point, since our field values are backed by refs, you could set an input's v-model attribute to either `username` or `form.username.value`, both will maintain the same value between them.
```html
<input type="text"
  v-model="username"
  @blur="form.username.validate()"
/>
<!-- check if field is invalid and display error messages -->
<span v-if="form.username.invalid">{{ form.username.errorMessages }}</span>
<!-- or check if field has specific error -->
<span v-if="form.username.hasError('required')">Username is required</span>

<!-- password input omitted for brevity, works the same as username input -->
```

#### Options API

It is recommended to define your validation field & field groups within the component's `setup` function as demonstrated in the above Composition API example.  However, if needed, you can define these within the Options API's `data` structure.

```typescript
import { defineComponent } from 'vue'
import { field, fieldGroup, required } from 'vue-validus'
export default defineComponent({
  data() {
    return {
      form: fieldGroup({
        username: field([required()], '<optional initial value>'),
        password: field([required()])
      })
    }
  }
})
```
```html
<input type="text"
  v-model="form.username.value"
  @blur="form.username.validate()"
/>
<!-- check if field is invalid and display error messages -->
<span v-if="form.username.invalid">{{ form.username.errorMessages }}</span>
<!-- or check if field has specific error -->
<span v-if="form.username.hasError('required')">Username is required</span>

<!-- password input omitted for brevity, works the same as username input -->
```

## Changelog

Changes for each release are documented in the [CHANGELOG](CHANGELOG) file.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

[npm-image]: https://img.shields.io/npm/v/vue-validus.svg
[npm-url]: https://npmjs.org/package/vue-validus
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: LICENSE