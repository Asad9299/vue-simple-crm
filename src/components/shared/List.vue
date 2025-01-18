<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3" v-for="(column, index) in columns" :key="index">
            <div class="flex items-center">
              {{ column.label }}
              <a href="javascript:void(0)">
                <SvgIcon class="w-3 h-3 ms-1.5" icon="sort" />
              </a>
            </div>
          </th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          v-for="row in rows"
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
    </table>
  </div>
</template>
<script lang="ts" setup>
import SvgIcon from '../svgs/SvgIcon.vue'

defineProps<{
  columns: Array<{ key: string; label: string; sortable?: boolean }>
  rows: Array<any>
}>()
</script>
