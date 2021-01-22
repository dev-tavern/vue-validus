import { defineComponent } from 'vue'
import { field, fieldGroup, minLength, required } from '../../../src'

const template = `
  <form @submit.prevent="form.validate()" data-test="form">
    <input
      v-model="form.inputField.value"
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
  name: 'OptionsUsingFieldGroupValue',
  template,
  data() {
    return {
      form: fieldGroup({
        inputField: field([required(), minLength(5)])
      })
    }
  }
})
