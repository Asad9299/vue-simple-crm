<template>
  <List :columns="columns" :rows="users">
    <template #actions="{ row }">
      <!-- Edit Button -->
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        @click="editUser(row)"
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

  <!-- Delete Modal -->
  <Modal :show-modal="showDeleteModal">
    <template #header>
      <div class="p-4 text-center">
        <svg
          class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>
    </template>

    <template #body>
      <div class="text-center">
        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          Are you sure you want to delete this user?
        </h3>
      </div>
    </template>

    <template #footer>
      <div class="md:p-5 text-center">
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

  <!-- Edit Modal -->
  <Modal :show-modal="showEditModal">
    <template #header>
      <div
        class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Edit User</h3>
      </div>
    </template>

    <template #body>
      <form class="p-4 md:p-5" method="post">
        <div class="grid gap-4 mb-4 grid-cols-2">
          <!-- Name -->
          <div class="col-span-2">
            <TextField type="text" name="name" label="Name" placeholder="John Doe" v-model="name">
            </TextField>
          </div>

          <!-- Email -->
          <div class="col-span-2">
            <TextField
              type="email"
              name="email"
              label="Email"
              placeholder="john@doe.com"
              v-model="email"
            >
            </TextField>
          </div>
        </div>
        <div class="flex justify-between mt-4">
          <button
            type="submit"
            class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>

          <button
            type="button"
            class="text-white inline-flex items-center bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            @click="cancelEdit()"
          >
            Cancel
          </button>
        </div>
      </form>
    </template>

    <template #footer></template>
  </Modal>
</template>

<script lang="ts" setup>
import { TextField } from '@/components/elements'
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

const name = ref('')
const email = ref('')

const showDeleteModal = ref(false)
const showEditModal = ref(false)
const selectedRow = ref<User | null>(null)

const showConfirmation = (row: User) => {
  showDeleteModal.value = true
  selectedRow.value = row
}

const cancelDelete = () => {
  showDeleteModal.value = false
}

const cancelEdit = () => {
  showEditModal.value = false
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
    showDeleteModal.value = false
    selectedRow.value = null
  }
}

const editUser = (row: User) => {
  showEditModal.value = true
  console.log('user', row)
}
</script>
