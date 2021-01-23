import { defineComponent, ref } from 'vue'
import { field, fieldGroup, minLength, required } from '../../../src'

const template = `
  <form @submit.prevent="form.validate()" data-test="form">
    <input
      v-model="inputField"
      @blur="form.inputField.validate()"
      type="text"
      data-test="input"
    />
    <span v-if="form.inputField.invalid" data-test="error-messages">
      {{ form.inputField.errorMessages }}
    </span>
  </form>
`

export default defineComponent({
  name: 'CompositionUsingFieldGroupFieldRef',
  template,
  setup() {
    const inputField = ref('')
    const form = fieldGroup({
      inputField: field([required(), minLength(5)], inputField)
    })
    return {
      form,
      inputField
    }
  }
})
