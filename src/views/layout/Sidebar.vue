<template>
  <aside
    id="sidebar"
    class="fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 hidden w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width"
    aria-label="Sidebar"
  >
    <div
      class="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
        <div
          class="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700"
        >
          <ul class="pb-2 space-y-2">
            <li>
              <a
                href="https://flowbite-admin-dashboard.vercel.app/"
                class="flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700"
              >
                <svg-icon
                  class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  icon="dashboard"
                ></svg-icon>
                <span class="ml-3" sidebar-toggle-item>Dashboard</span>
              </a>
            </li>

            <li>
              <a
                href="javascript:void(0)"
                class="flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 bg-gray-100 dark:bg-gray-700"
              >
                <svg-icon
                  class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  icon="layout"
                >
                </svg-icon>

                <span class="ml-3" sidebar-toggle-item="">Products</span>
              </a>
            </li>

            <li>
              <a
                class="text-base text-gray-900 rounded-lg flex items-center p-2 group hover:bg-gray-100 transition duration-75 pl-11 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/svgs/SvgIcon.vue'

const logout = () => {
  alert('asad')
  console.log('pending logout')
}
</script>
