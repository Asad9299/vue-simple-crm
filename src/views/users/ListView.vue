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
        <svg-icon class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" icon="warning">
        </svg-icon>
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
        <DangerButton label="Yes, I'm sure" @click="deleteUser()"> </DangerButton>

        <SecondaryButton label="No, cancel" @click="cancelDelete()"></SecondaryButton>
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
          <PrimaryButton label="Save"></PrimaryButton>

          <SecondaryButton label="Cancel" @click="cancelEdit()"></SecondaryButton>
        </div>
      </form>
    </template>

    <template #footer></template>
  </Modal>
</template>

<script lang="ts" setup>
import { PrimaryButton, TextField } from '@/components/elements'
import DangerButton from '@/components/elements/buttons/DangerButton.vue'
import SecondaryButton from '@/components/elements/buttons/SecondaryButton.vue'
import List from '@/components/shared/List.vue'
import Modal from '@/components/shared/Modal.vue'
import SvgIcon from '@/components/svgs/SvgIcon.vue'
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
