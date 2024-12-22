<template>
  <div>
    <label :for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {{ label }}
      <span v-if="props.required" class="text-red-500">*</span>
    </label>

    <input
      :type="type"
      :name="name"
      :id="id"
      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
      @blur="validate"
    />
    <small v-if="!isValid" class="text-red-500">{{ errorMessage }}</small>
  </div>
</template>

<script lang="ts" setup>
import { formatFormKeys } from '@/helpers/utility'
import { ref } from 'vue'
const props = defineProps<{
  type: string
  name: string
  id?: string
  placeholder?: string
  label: string
  modelValue?: string | number
  required?: boolean
  pattern?: string
  customErrorMessage?: string
}>()

const isValid = ref<boolean | null>(null)

const emit = defineEmits(['update:modelValue', 'validate'])

const handleInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

const errorMessage = ref('')

const validate = () => {
  if (props.required && !props.modelValue) {
    isValid.value = false
    errorMessage.value = formatFormKeys(props.name) + ' field is required'
  } else if (props.pattern && !new RegExp(props.pattern).test(String(props.modelValue))) {
    isValid.value = false
    errorMessage.value = props.customErrorMessage || `${props.name} field is invalid`
  } else {
    isValid.value = true
    errorMessage.value = ''
  }
  return isValid.value
}
defineExpose({ validate })
</script>
