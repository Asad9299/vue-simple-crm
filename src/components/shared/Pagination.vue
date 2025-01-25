<template>
  <nav aria-label="Page navigation example">
    <ul class="flex items-center -space-x-px h-10 text-base">
      <li>
        <a
          href="#"
          class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          @click="handlePreviousPage"
        >
          <span class="sr-only">Previous</span>
          <SvgIcon icon="prevPg" class="w-3 h-3 rtl:rotate-180"></SvgIcon>
        </a>
      </li>
      <!-- Pages -->
      <li v-for="page in pages" :key="page">
        <a
          href="#"
          class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          @click="changePage(page)"
          :class="{ 'dark:bg-blue-700': currentPage == page }"
        >
          {{ page }}
        </a>
      </li>

      <!-- Next Page button -->
      <li>
        <a
          href="#"
          class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          @click="handleNextPage()"
        >
          <span class="sr-only">Next</span>
          <SvgIcon icon="nextPg" class="w-3 h-3 rtl:rotate-180"></SvgIcon>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import SvgIcon from '../svgs/SvgIcon.vue'

const props = defineProps<{
  pages: number
  currentPage: number
}>()

const emit = defineEmits<{
  (e: 'page-change', page: number): void
  (e: 'handleNextPage'): void
  (e: 'handlePreviousPage'): void
}>()

const changePage = (page: any) => {
  emit('page-change', page)
}

const handlePreviousPage = () => {
  emit('handlePreviousPage')
}

const handleNextPage = () => {
  emit('handleNextPage')
  // if (currentPage.value < props.pages) {
  //   changePage(currentPage.value + 1)
  // }
}
</script>
