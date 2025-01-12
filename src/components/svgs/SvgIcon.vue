<template>
  <svg :class="class" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <g v-if="icons[icon]">
      <path v-for="(path, index) in icons[icon]" :key="index" v-bind="path"></path>
    </g>
  </svg>
</template>

<script lang="ts" setup>
defineProps<{
  class: string
  icon: string
}>()

const icons: Record<string, Array<{ d: string; fillRule?: string; clipRule?: string }>> = {
  hamburger: [
    {
      d: 'M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z',
      fillRule: 'evenodd',
      clipRule: 'evenodd',
    },
  ],
  close: [
    {
      d: 'M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z',
      fillRule: 'evenodd',
      clipRule: 'evenodd',
    },
  ],
  crud: [
    {
      d: 'M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z',
      fillRule: 'evenodd',
      clipRule: 'evenodd',
    },
  ],
  layout: [
    {
      d: 'M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z',
      fillRule: 'evenodd',
      clipRule: 'evenodd',
    },
  ],
  dashboard: [
    {
      d: 'M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z',
      fillRule: 'evenodd',
      clipRule: 'evenodd',
    },
  ],
}
</script>
