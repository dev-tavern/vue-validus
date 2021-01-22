# Field Group

::: tip
View the [API Reference](/api/#fieldgroup) for further details on creating and using the FieldGroup object.
:::

A FieldGroup defines a collection of Field and/or FieldGroup objects, providing a convenient approach for validating and inspecting group members via a single object.  The FieldGroup does not detract from what you can do with a Field (you can still create and use fields just as described in the [Field](/guide/field) section), but it does provide a way to interact with all fields at once (validate, check validity, clear errors, etc.).

## Examples

### Using Without Common Data Source

All the ways of creating a Field, as described in the [Field](/guide/field) section, can be leveraged as well for creating the fields of a FieldGroup.  Since these are already demonstrated in the Field section, only the Ref approach is shown below.  However, you may find it more convenient to leverage one of the other approaches ([Using With Object of Refs](#using-with-object-of-refs), [Using with Reactive](#using-with-reactive)) for creating a FieldGroup, especially for a group containing many fields.

```typescript
// component
import { defineComponent, ref } from 'vue'
import { field, fieldGroup, required } from 'vue-validus'
export default defineComponent({
  setup() {
    // example: field group containing fields with values sourced from refs
    const username = ref('')
    const email = ref('')
    const form = fieldGroup({
      username: field([required()], username),
      email: field([required()], email)
    })
    // example: validate entire group at once and check result
    const handleSubmit = () => {
      form.validate()
      if (!form.invalid) {
        // submit...
      }
    }
    return { username, email, form, handleSubmit }
  }
})
```
At this point, since our field values are backed by refs, you could set an input's v-model attribute to either `username` or `form.username.value`, both will maintain the same value between them.
```html
<!-- template -->
<input type="text"
  v-model="username"
  @blur="form.username.validate()"
/>
<span v-if="form.username.invalid">{{ form.username.errorMessages }}</span>
<span v-if="form.username.hasError('required')">Username is required</span>

<!-- can also use the validate method to validate an individual field -->
<input type="text"
  v-model="email"
  @blur="form.validate('email')"
/>
<span v-if="form.email.invalid">{{ form.email.errorMessages }}</span>
<span v-if="form.email.hasError('required')">E-mail is required</span>
```

::: tip
When using this type of approach, you may find it helpful to use the [toPlainObject](/api/#toplainobject) utility when needing to submit the form data to a server.  This will map the values of the field group into a plain javascript object.
:::

### Using With Object of Refs

When an object of refs is provided as the second argument to the fieldGroup factory function, the values of the refs are mapped to the values of the fields within the group.  The keys should match between the field group and the object of refs to allow for appropriate mapping.

```typescript
// component
import { defineComponent, ref } from 'vue'
import { field, fieldGroup, required } from 'vue-validus'
export default defineComponent({
  setup() {
    const data = {
      username: ref(''),
      email: ref(''),
      address: {
        zip: ref('')
      }
    }
    const form = fieldGroup({
      username: field([required()]),
      email: field([required()]),
      address: fieldGroup({
        zip: field([])
      })
    }, data)
    // example: validate entire group at once and check result
    const handleSubmit = () => {
      form.validate()
      if (!form.invalid) {
        // submit...
      }
    }
    return { data, form, handleSubmit }
  }
})
```
At this point, since our field values are backed by refs, you could set an input's v-model attribute to either `data.username.value` or `form.username.value`, both will maintain the same value between them.
```html
<!-- template -->
<input type="text"
  v-model="data.username.value"
  @blur="form.username.validate()"
/>
<span v-if="form.username.invalid">{{ form.username.errorMessages }}</span>
<span v-if="form.username.hasError('required')">Username is required</span>

<!-- can also use the validate method to validate an individual field -->
<input type="text"
  v-model="data.email.value"
  @blur="form.validate('email')"
/>
<!-- validity checks omitted for brevity -->

<!-- nested fields can be validated as usual, using either: -->
  <!-- form.address.zip.validate() -->
  <!-- form.validate('address.zip') -->
<input type="text"
  v-model="data.address.zip.value"
  @blur="form.validate('address.zip')"
/>
<!-- validity checks omitted for brevity -->
```

### Using With Reactive

When a reactive object is provided as the second argument to the fieldGroup factory function, the values of the reactive object are mapped to the values of the fields within the group.  The keys should match between the field group and the reactive object to allow for appropriate mapping.

```typescript
// component
import { defineComponent, reactive } from 'vue'
import { field, fieldGroup, required } from 'vue-validus'
export default defineComponent({
  setup() {
    const data = reactive({
      username: '',
      email: '',
      address: {
        zip: ''
      }
    })
    const form = fieldGroup({
      username: field([required()]),
      email: field([required()]),
      address: fieldGroup({
        zip: field([])
      })
    }, data)
    // example: validate entire group at once and check result
    const handleSubmit = () => {
      form.validate()
      if (!form.invalid) {
        // submit...
      }
    }
    return { data, form, handleSubmit }
  }
})
```
At this point, since our field values are backed by the reactive object, you could set an input's v-model attribute to either `data.username` or `form.username.value`, both will maintain the same value between them.
```html
<!-- template -->
<input type="text"
  v-model="data.username"
  @blur="form.username.validate()"
/>
<span v-if="form.username.invalid">{{ form.username.errorMessages }}</span>
<span v-if="form.username.hasError('required')">Username is required</span>

<!-- can also use the validate method to validate an individual field -->
<input type="text"
  v-model="data.email"
  @blur="form.validate('email')"
/>
<!-- validity checks omitted for brevity -->

<!-- nested fields can be validated as usual, using either: -->
  <!-- form.address.zip.validate() -->
  <!-- form.validate('address.zip') -->
<input type="text"
  v-model="data.address.zip"
  @blur="form.validate('address.zip')"
/>
<!-- validity checks omitted for brevity -->
```