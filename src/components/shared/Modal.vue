<template>
  <div
    v-if="showModal"
    id="default-modal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
  >
    <div class="relative w-full max-w-2xl p-4">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <slot name="header"> </slot>
        <slot name="body"></slot>
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  showModal: boolean
}>()
</script>
