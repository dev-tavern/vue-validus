import { defineComponent } from 'vue'
import { field, minLength, required } from '../../../src'

const template = `
  <form  @submit.prevent="inputField.validate()" data-test="form">
    <input
      v-model="inputField.value"
      @blur="inputField.validate()"
      type="text"
      data-test="input"
    />
    <span v-if="inputField.invalid" data-test="error-messages">
      {{ inputField.errorMessages }}
    </span>
  </form>
`

export default defineComponent({
  name: 'OptionsUsingFieldValue',
  template,
  data() {
    return {
      inputField: field([required(), minLength(5)])
    }
  }
})