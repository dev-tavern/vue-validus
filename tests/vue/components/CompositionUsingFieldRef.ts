import { defineComponent, ref } from 'vue'
import { field, minLength, required } from '../../../src'

const template = `
  <form  @submit.prevent="inputField.validate()" data-test="form">
    <input
      v-model="inputRef"
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
  name: 'CompositionUsingFieldRef',
  template,
  setup() {
    const inputRef = ref('')
    const inputField = field([required(), minLength(5)], inputRef)
    return {
      inputRef,
      inputField
    }
  }
})
