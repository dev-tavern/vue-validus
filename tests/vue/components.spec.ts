import { mount } from '@vue/test-utils'
import CompositionUsingFieldValue from './components/CompositionUsingFieldValue'
import CompositionUsingFieldRef from './components/CompositionUsingFieldRef'
import CompositionUsingFieldGroupValue from './components/CompositionUsingFieldGroupValue'
import CompositionUsingFieldGroupFieldRef from './components/CompositionUsingFieldGroupFieldRef'
import CompositionUsingFieldGroupViaReactiveToRef from './components/CompositionUsingFieldGroupViaReactiveToRef'
import CompositionUsingFieldGroupForObjectReactive from './components/CompositionUsingFieldGroupForObjectReactive'
import CompositionUsingFieldGroupForObjectRefs from './components/CompositionUsingFieldGroupForObjectRefs'
import OptionsUsingFieldValue from './components/OptionsUsingFieldValue'
import OptionsUsingFieldGroupValue from './components/OptionsUsingFieldGroupValue'

runTest(CompositionUsingFieldValue)
runTest(CompositionUsingFieldRef)
runTest(CompositionUsingFieldGroupValue)
runTest(CompositionUsingFieldGroupFieldRef)
runTest(CompositionUsingFieldGroupViaReactiveToRef)
runTest(CompositionUsingFieldGroupForObjectReactive)
runTest(CompositionUsingFieldGroupForObjectRefs)
runTest(OptionsUsingFieldValue)
runTest(OptionsUsingFieldGroupValue)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function runTest(component: any) {
  describe(component.name, () => {
    test('displays error message on submit when invalid', async () => {
      const wrapper = mount(component)
      await wrapper.get('[data-test="form"]').trigger('submit')
      expect(wrapper.get('[data-test="error-messages"]').text()).toContain('Required')
    })
    
    test('displays error message on blur when invalid', async () => {
      const wrapper = mount(component)
      await wrapper.get('[data-test="input"]').setValue('test')
      await wrapper.get('[data-test="input"]').trigger('blur')
      expect(wrapper.get('[data-test="error-messages"]').text()).toContain('Does not meet the minimum length of 5')
    })
    
    test('does not display error message when valid', async () => {
      const wrapper = mount(component)
      await wrapper.get('[data-test="input"]').setValue('test1')
      await wrapper.get('[data-test="input"]').trigger('blur')
      await wrapper.get('[data-test="form"]').trigger('submit')
      expect(wrapper.find('[data-test="error-messages"]').exists()).toBe(false)
    })
  })
}