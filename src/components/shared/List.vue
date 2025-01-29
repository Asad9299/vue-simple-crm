<template>
  <div class="m-2 flex items-center justify-between gap-4">
    <div class="w-1/4">
      <SelectField label="Records Per Page" :options="recordsLimit" @change="updateRecordLimit" />
    </div>

    <div class="w-1/3">
      <TextField type="text" name="search" label="Search" placeholder="Search" v-model="search" @search-string="handleSearch" />
    </div>
  </div>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3" v-for="(column, index) in columns" :key="index">
            <div class="flex items-center">
              {{ column.label }}
              <a href="javascript:void(0)" class="inline-flex items-center" @click="handleSort(column.key)">
                <SvgIcon class="w-4 h-4 text-gray-800 dark:text-white -mr-1" icon="arrow_down" />
                <SvgIcon class="w-4 h-4 text-gray-800 dark:text-white -ml-1" icon="arrow_up" />
              </a>
            </div>
          </th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          v-for="row in paginatedRows"
          :key="row.id"
        >
          <td
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            v-for="column in columns"
            :key="column.key"
          >
            {{ row[column.key] }}
          </td>
          <td>
            <slot name="actions" :row="row"></slot>
          </td>
        </tr>
      </tbody>

      <tfooter>
        <div class="mt-2">
          <Pagination
            :currentPage="currentPage"
            :pages="totalPages"
            :totalRecords="rows.length"
            @page-change="handlePageChange"
            @handle-next-page="handleNextPage"
            @handle-previous-page="handlePreviousPage"
          ></Pagination>
        </div>
      </tfooter>
    </table>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import SvgIcon from '../svgs/SvgIcon.vue'
import Pagination from './Pagination.vue'
import SelectField from '../elements/SelectField.vue'
import TextField from '../elements/TextField.vue';

const props = defineProps<{
  columns: Array<{ key: string; label: string; sortable?: boolean }>
  rows: Array<any>
}>()

const emit = defineEmits<{
  (e: 'handleSearch', value: string): void,
  (e: 'sortKey', key: string): void
}>()


const search = ref('');

// Rows per page
const rowsPerPage = ref(5)
const currentPage = ref(1)

const recordsLimit = ref<number[]>([5, 10, 50, 100])

// Calculate total pages
const totalPages: any = computed(() => Math.ceil(props.rows.length / rowsPerPage.value))

// Get rows for the current page
const paginatedRows = computed(() =>
  props.rows.slice(
    (currentPage.value - 1) * rowsPerPage.value,
    currentPage.value * rowsPerPage.value
  )
)

const handlePageChange = (page: number) => {
  currentPage.value = page
}

const updateRecordLimit = (value: number) => {
  rowsPerPage.value = value
  currentPage.value = 1
}

const handleNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const handlePreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const handleSearch = ( search: string ) => {
  emit('handleSearch', search)
}

const handleSort = (key: string) => {
  emit('sortKey', key)
}

</script>
