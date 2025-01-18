<template>
  <List :columns="columns" :rows="users">
    <template #actions="{ row }">
      <!-- Edit Button -->
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Edit
      </button>

      <!-- Delete Button -->
      <button
        type="button"
        class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
        @click="showConfirmation(row)"
      >
        Delete
      </button>
    </template>
  </List>

  <Modal :showModal="showModal">
    <template #header> </template>
    <template #body> </template>
    <template #footer>
      <div class="p-4 md:p-5 text-center">
        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          Are you sure you want to delete this product?
        </h3>
        <button
          data-modal-hide="popup-modal"
          type="button"
          class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
          @click="deleteUser()"
        >
          Yes, I'm sure
        </button>
        <button
          data-modal-hide="popup-modal"
          type="button"
          class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          @click="cancelDelete()"
        >
          No, cancel
        </button>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import List from '@/components/shared/List.vue'
import Modal from '@/components/shared/Modal.vue'
import type { User } from '@/stores/user'
import { ref } from 'vue'

const columns = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
]

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
]

const showModal = ref(false)
const selectedRow = ref<User | null>(null)

const showConfirmation = (row: User) => {
  showModal.value = true
  selectedRow.value = row
}

const cancelDelete = () => {
  showModal.value = false
}

/**
 * Called on Yes, I am sure
 */

const deleteUser = () => {
  if (selectedRow.value) {
    console.log('selectedRow', selectedRow.value)
    /*
      AJAX Reuqest to delete the user.
    */
    showModal.value = false
    selectedRow.value = null
  }
}
</script>
