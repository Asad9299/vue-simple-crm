<template>
  <input
    :id="id"
    :aria-describedby="name"
    :name="name"
    type="checkbox"
    class="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
    required
  />
</template>

<script lang="ts" setup>
defineProps<{
  name: string
  id: string
}>()
</script>
