import { computed, reactive, ref } from 'vue'
import { requiredIf } from '../../src'

describe('requiredIf validator', () => {

  it('is not required when boolean condition false', () => {
    expect(requiredIf(false).execute(undefined)).toBe(true)
  })

  it('is not required when Ref<boolean> condition false', () => {
    const condition = ref(false)
    expect(requiredIf(condition).execute(undefined)).toBe(true)
  })

  it('is not required when ComputedRef<boolean> condition false', () => {
    const condition = computed(() => false)
    expect(requiredIf(condition).execute(undefined)).toBe(true)
  })

  it('is not required when functional condition false', () => {
    const condition = () => false
    expect(requiredIf(condition).execute(undefined)).toBe(true)
  })

  it('is required when boolean condition true', () => {
    expect(requiredIf(true).execute(undefined)).toBe(false)
  })

  it('is required when Ref<boolean> condition true', () => {
    const condition = ref(true)
    expect(requiredIf(condition).execute(undefined)).toBe(false)
  })

  it('is required when ComputedRef<boolean> condition true', () => {
    const condition = computed(() => true)
    expect(requiredIf(condition).execute(undefined)).toBe(false)
  })

  it('is required when functional condition true', () => {
    const condition = () => true
    expect(requiredIf(condition).execute(undefined)).toBe(false)
  })

  it('uses current value of Ref<boolean> at execution', () => {
    const condition = ref(false)
    expect(requiredIf(condition).execute(undefined)).toBe(true)
    condition.value = true
    expect(requiredIf(condition).execute(undefined)).toBe(false)
  })

  it('uses current value of ComputedRef<boolean> at execution', () => {
    const data = ref('no')
    const condition = computed(() => data.value === 'yes')
    expect(requiredIf(condition).execute(undefined)).toBe(true)
    data.value = 'yes'
    expect(requiredIf(condition).execute(undefined)).toBe(false)
  })

  it('uses current value of ref within functional condition at execution', () => {
    const data = ref('no')
    const condition = () => data.value === 'yes'
    expect(requiredIf(condition).execute(undefined)).toBe(true)
    data.value = 'yes'
    expect(requiredIf(condition).execute(undefined)).toBe(false)
  })

  it('uses current value of reactive within functional condition at execution', () => {
    const data = reactive({ someValue: 'no' })
    const condition = () => data.someValue === 'yes'
    expect(requiredIf(condition).execute(undefined)).toBe(true)
    data.someValue = 'yes'
    expect(requiredIf(condition).execute(undefined)).toBe(false)
  })

  it('uses current value of a basic variable within fuctional condition at execution', () => {
    let data = 'no'
    const condition = () => data === 'yes'
    expect(requiredIf(condition).execute(undefined)).toBe(true)
    data = 'yes'
    expect(requiredIf(condition).execute(undefined)).toBe(false)
  })

  it('provides default message', () => {
    const validator = requiredIf(true)
    expect(validator.message).toBe('Required')
  })

  it('uses custom message', () => {
    const validator = requiredIf(true,'custom message')
    expect(validator.message).toBe('custom message')
  })

})