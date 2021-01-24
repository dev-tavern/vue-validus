# Getting Started

Validations are defined and leveraged using Fields and FieldGroups.  A `Field` defines a single value and how it is validated.  A `FieldGroup` is a collection of Fields which can be validated together and managed via a single object.  Fields and FieldGroups expose similar properties/methods for validating, modifying, and inspecting the state of the field(s).  These are created using simple factory functions:

**Function**|**Returns**|**Description**
:-----|:-----|:-----
`field<T>(validators: Validator[], fieldValue?: T)` | `Field<T>` | Create a Field with the provided validators and optional value.  Can be validated alone or as part of a FieldGroup.  The provided field value can be a Vue Ref object, in which case the value of this field and the Ref will be kept in sync.
`fieldGroup<T extends FieldGroupProps>(fields: T, data?: Record<string, unknown>)` | `FieldGroupType<T>` | Create a group of fields / field groups which can be validated and inspected via a single object.  If a data object is provided, the values of the data object will be applied to the properties (field and/or field groups) of this field group.  If the provided data object is a Vue reactive object or object containing Vue refs, the values within the field group will remain in sync with the provided data object.

## Examples

::: tip
More detailed examples can be found in the **Core Concepts** section.
:::

>**Below are simple examples demonstrating a few ways to define a field group with a single field.  For simplicity, the validation is shown as being invoked against the single field on blur event.  Note that fields do not need to be defined within a field group, they can be created outside of a field group and used on their own as well.**

---

**Field Group Using Reactive Data Source**
```ts
import { defineComponent, reactive } from 'vue'
import { field, fieldGroup, minLength, required } from 'vue-validus'
export default defineComponent({
  setup() {
    const data = reactive({
      inputField: 'Initial value'
    })
    const form = fieldGroup({
      inputField: field([required(), minLength(5)])
    }, data)
    return {
      form,
      data
    }
  }
})
```
```html
<input type="text"
  v-model="data.inputField"
  @blur="form.inputField.validate()"
/>
<span v-if="form.inputField.invalid">{{ form.inputField.errorMessages }}</span>
```

---

**Field Group Using Refs Data Source**
```ts
import { defineComponent, ref } from 'vue'
import { field, fieldGroup, minLength, required } from 'vue-validus'
export default defineComponent({
  setup() {
    const inputField = ref('Initial value')
    const form = fieldGroup({
      inputField: field([required(), minLength(5)])
    }, { inputField })
    return {
      form,
      inputField
    }
  }
})
```
```html
<input type="text"
  v-model="inputField"
  @blur="form.inputField.validate()"
/>
<span v-if="form.inputField.invalid">{{ form.inputField.errorMessages }}</span>
```

---

**Basic Field Group**
```ts
import { defineComponent } from 'vue'
import { field, fieldGroup, minLength, required } from 'vue-validus'
export default defineComponent({
  setup() {
    const form = fieldGroup({
      inputField: field([required(), minLength(5)], 'Initial value')
    })
    return {
      form
    }
  }
})
```
```html
<input type="text"
  v-model="form.inputField.value"
  @blur="form.inputField.validate()"
/>
<span v-if="form.inputField.invalid">{{ form.inputField.errorMessages }}</span>
```

---

**Basic Field Group Using Refs**
```ts
import { defineComponent, ref } from 'vue'
import { field, fieldGroup, minLength, required } from 'vue-validus'
export default defineComponent({
  setup() {
    const inputField = ref('Initial value')
    const form = fieldGroup({
      inputField: field([required(), minLength(5)], inputField)
    })
    return {
      form,
      inputField
    }
  }
})
```
```html
<input type="text"
  v-model="inputField"
  @blur="form.inputField.validate()"
/>
<span v-if="form.inputField.invalid">{{ form.inputField.errorMessages }}</span>
```

---

**Using the Options API's data**
It is recommended to define your validation field & field groups within the component's `setup` function as demonstrated in the above examples.  However, if needed, you can define these within the Options API's `data` structure.

```typescript
import { defineComponent } from 'vue'
import { field, fieldGroup, required } from 'vue-validus'
export default defineComponent({
  data() {
    return {
      form: fieldGroup({
        inputField: field([required()], 'Initial value')
      })
    }
  }
})
```
```html
<input type="text"
  v-model="form.inputField.value"
  @blur="form.inputField.validate()"
/>
<span v-if="form.inputField.invalid">{{ form.inputField.errorMessages }}</span>
```