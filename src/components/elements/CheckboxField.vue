<template>
  <input
    :id="id"
    :aria-describedby="name"
    :name="name"
    type="checkbox"
    class="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
    :value="modelValue"
    @input="handleCheckboxChange"
    @change="validate"
  />
  <small v-if="!isValid" class="text-red-500">{{ errorMessage }}</small>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps<{
  name: string
  id: string
  modelValue: boolean
  required?: boolean
}>()

const isValid = ref<boolean | null>(null)

const emit = defineEmits(['update:modelValue'])

const handleCheckboxChange = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).checked)
}

const errorMessage = ref('')

const validate = () => {
  if (props.required && !props.modelValue) {
    isValid.value = false
    errorMessage.value = 'Please accept the terms and conditions'
  } else {
    isValid.value = true
    errorMessage.value = ''
  }
  return isValid.value
}

defineExpose({ validate })
</script>
