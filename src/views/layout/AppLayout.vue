<template>
  <Navbar />
  <Sidebar />

  <div
    class="fixed inset-0 z-10 hidden bg-gray-900/50 dark:bg-gray-900/90"
    id="sidebarBackdrop"
  ></div>

  <div
    id="main-content"
    class="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900"
  >
    <main>
      <div class="px-4 pt-6">
        <div class="grid gap-4 xl:grid-cols-2 2xl:grid-cols-3"></div>
        <div class="flex flex-col mt-6">
          <div class="overflow-x-auto rounded-lg">
            <div class="inline-block min-w-full align-middle">
              <div class="overflow-hidden shadow sm:rounded-lg">
                <RouterView/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import Sidebar from '@/views/layout/Sidebar.vue'
import Navbar from '@/views/layout/Navbar.vue'
import Footer from '@/views/layout/Footer.vue'
</script>
