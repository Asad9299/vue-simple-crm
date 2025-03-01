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
                <SvgIcon class="w-4 h-4 text-gray-800 dark:text-white -mr-1" icon="arrow_down" @click="sortOrder = 'DESC'" :class="sortOrder === 'DESC' ? 'bg-black' : ''"
                 />
                <SvgIcon class="w-4 h-4 text-gray-800 dark:text-white -ml-0" icon="arrow_up"  @click="sortOrder = 'ASC'"
                :class="sortOrder === 'ASC' ? 'bg-black' : ''"
                />
              </a>
            </div>
          </th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          v-for="row in props.rows"
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

        <tr v-if="rows.length === 0">
          <td class="px-6 py-4 font-medium text-center text-gray-900 whitespace-nowrap dark:text-white" colspan="100%">
            No records found
          </td>
        </tr>
      </tbody>

      <tfooter>
        <div class="mt-2">
          <Pagination
            :currentPage="currentPage"
            :pages="totalPages"
            :totalRecords="totalRecords"
            :paginationLinks="paginationLinks"
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
import { ref } from 'vue'
import SvgIcon from '../svgs/SvgIcon.vue'
import Pagination from './Pagination.vue'
import SelectField from '../elements/SelectField.vue'
import TextField from '../elements/TextField.vue';

const props = defineProps<{
  columns: Array<{ key: string; label: string; sortable?: boolean }>
  rows: Array<any>,
  currentPage: number,
  totalPages: number,
  recordsPerPage: number,
  paginationLinks: Array<any>,
  totalRecords: number
}>()

const emit = defineEmits<{
  (e: 'handleSearch', value: string): void,
  (e: 'sortKey', key: string): void
  (e: 'sortOrder', key: string): void,
  (e: 'page-change', page: number): void,
  (e: 'handleSort', key: string): void
}>()

const sortOrder = ref('DESC');

const search = ref('');

// Rows per page
const rowsPerPage = ref(props.recordsPerPage ?? 5)
const currentPage = ref(props.currentPage) ?? 1

const recordsLimit = ref<number[]>([5, 10, 50, 100])


const handlePageChange = (page: number) => {
  currentPage.value = page
  emit('page-change', page)
}

const updateRecordLimit = (value: number) => {
  rowsPerPage.value = value
  currentPage.value = 1
}

const handleNextPage = () => {
  if (currentPage.value < props.totalPages) {
    currentPage.value++
    emit('page-change', currentPage.value)
  }
}

const handlePreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    emit('page-change', currentPage.value)
  }
}

const handleSearch = ( search: string ) => {
  emit('handleSearch', search)
}

const handleSort = (key: string) => {
  emit('sortKey', key)
  emit('sortOrder', sortOrder.value)
}

</script>
