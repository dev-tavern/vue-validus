import { defineComponent, reactive } from 'vue'
import { fieldGroup, field, minLength, required } from '../../../src'

const template = `
  <form @submit.prevent="form.validate()" data-test="form">
    <input
      v-model="data.inputField"
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
  name: 'CompositionUsingFieldGroupForObjectReactive',
  template,
  setup() {
    const data = reactive({
      inputField: ''
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