<template>
  <List :columns="columns" :rows="users" @handle-search="search" @sort-key="handleSortKey" @sort-order="handleSortOrder"
  :currentPage="currentPage" :totalPages="totalPages" :recordsPerPage="recordsPerPage" :paginationLinks="paginationLinks" :totalRecords="totalRecords" @page-change="handlePageChange">
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
import { PrimaryButton, DangerButton, SecondaryButton, TextField } from '@/components/elements'
import List from '@/components/shared/List.vue'
import Modal from '@/components/shared/Modal.vue'
import SvgIcon from '@/components/svgs/SvgIcon.vue'
import ajax from '@/stores/ajax'
import type { User } from '@/stores/user'
import { ref, watch } from 'vue'
import { toast } from 'vue3-toastify'

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
]

const users = ref<User[]>([]);

const name = ref('')
const email = ref('')

const showDeleteModal = ref(false)
const showEditModal = ref(false)
const selectedRow = ref<User | null>(null)

const searchTerm = ref('');
const sortKey    = ref('');
const sortOrder  = ref('');

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

const currentPage     = ref(1);
const totalPages      = ref(1);
const recordsPerPage  = ref(5);
const paginationLinks = ref([]);
const totalRecords    = ref(0);

const ajaxObj = new ajax();

const listUsers = async () => {
  if ( sortKey.value === '' || sortOrder.value === '' ) {
    sortKey.value   = 'name';
    sortOrder.value = 'DESC';
  }
  const response = await ajaxObj.get('/users?page=' + currentPage.value+"&search="+searchTerm.value+"&sort_key="+sortKey.value+"&sort_order="+sortOrder.value);
  if ( 200 === response.status ) {
    users.value = (response.data as { data: User[] }).data;
    currentPage.value = (response.data as any).meta.current_page;
    totalPages.value = (response.data as any).meta.last_page;
    recordsPerPage.value = (response.data as any).meta.per_page;
    paginationLinks.value = (response.data as any).meta.links;
    totalRecords.value = (response.data as any).meta.total;
  }
}
listUsers();
/**
 * Called on Yes, I am sure
 */

const deleteUser = async () => {
  if (selectedRow.value) {
    const response = await ajaxObj.delete('/users/' + (selectedRow.value as User).uuid);
    if ( 200 === response.status ) {
      toast.success('User deleted successfully');
      listUsers();
    }
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

const search = ( search: string ) => {
  searchTerm.value = search;
}

const handleSortKey = ( key: string ) => {
  sortKey.value = key;
}

const handleSortOrder = ( order: string ) => {
  sortOrder.value = order;
}

const handlePageChange = ( page: number ) => {
  currentPage.value = page;
}

watch([searchTerm, sortKey, sortOrder, currentPage], () => {
  listUsers();
})
</script>
