# Field

::: tip
View the [API Reference](/api/#field) for further details on creating and using the Field object.
:::

A Field defines how a single value is validated and provides functions/properties for interacting with and inspecting the state of the field.  There are various approaches for creating a field, using the `field` factory function, demonstrated below.  The value of a field can be set & updated directly or by using Vue reactive objects (ref and reactive).

Once created, a field can be validated by invoking the `validate` function and inspected using several properties (`invalid`, `errors`, `errorMessages`).  You can check for the existence of a specific error by using the `hasError` function, and you can remove all errors and reset the field to be considered as valid by using the `clear` function.  

A field's errors and errorMessages are driven by the validators applied to the field, see the [Validation](/guide/validation) section for more details.  If needed, you can manually add and remove items from these properties as you would any array.

## Examples

### Using Ref

By providing a ref object as the value of a field, the field's value and ref's value will remain the same.  When the ref's value is changed, the field's value is also changed the same (and vice versa).

```typescript
// component
import { defineComponent, ref } from 'vue'
import { field, required } from 'vue-validus'
export default defineComponent({
  setup() {
    const username = ref('')
    const usernameField = field([required()], username)
    return { username, usernameField }
  }
})
```
At this point, you could set an input's v-model attribute to either `username` or `usernameField.value`, both will maintain the same value between them.
```html
<!-- template -->
<input type="text"
  v-model="username"
  @blur="usernameField.validate()"
/>
<!-- check if field is invalid and display error messages -->
<span v-if="usernameField.invalid">{{ usernameField.errorMessages }}</span>
<!-- or check if field has specific error -->
<span v-if="usernameField.hasError('required')">Username is required</span>
```

### Using Reactive

You can use a reactive object's property as the value of a field, by providing the result of Vue's `toRef` as the value.  This creates a ref for the property on the source reactive object, retaining a reactive connection between the ref and its source property.  Similar to using a ref directly (as described in the [Using Ref](#using-ref) section), the field's value and ref's value will remain the same even if one changes.

```typescript
// component
import { defineComponent, reactive, toRef } from 'vue'
import { field, required } from 'vue-validus'
export default defineComponent({
  setup() {
    const data = reactive({
      username: ''
    })
    const usernameField = field([required()], toRef(data, 'username'))
    return { data, usernameField }
  }
})
```
At this point, you could set an input's v-model attribute to either `data.username` or `usernameField.value`, both will maintain the same value between them.
```html
<!-- template -->
<input type="text"
  v-model="data.username"
  @blur="usernameField.validate()"
/>
<!-- check if field is invalid and display error messages -->
<span v-if="usernameField.invalid">{{ usernameField.errorMessages }}</span>
<!-- or check if field has specific error -->
<span v-if="usernameField.hasError('required')">Username is required</span>
```

### Using Field Value Directly

It is not required to source a field's value from a ref or reactive object, you can use the field's value property alone if desired.

```typescript
// component
import { defineComponent } from 'vue'
import { field, required } from 'vue-validus'
export default defineComponent({
  setup() {
    const username = field([required()], 'optional initial value here')
    return { username }
  }
})
```
```html
<!-- template -->
<input type="text"
  v-model="username.value"
  @blur="username.validate()"
/>
<!-- check if field is invalid and display error messages -->
<span v-if="username.invalid">{{ username.errorMessages }}</span>
<!-- or check if field has specific error -->
<span v-if="username.hasError('required')">Username is required</span>
```

---

The Field object provides the means to validate and inspect the validity of a single field value.  When you have multiple fields to validate together, a FieldGroup may be used.