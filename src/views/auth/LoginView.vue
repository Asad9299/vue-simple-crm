<template>
  <div
    class="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900"
  >
    <a
      href="javascript:void(0)"
      class="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white"
    >
      <img src="@/assets/logo.svg" class="mr-4 h-11" alt="Simple CRM Logo" />
      <span>Simple CRM</span>
    </a>
    <!-- Card -->
    <div class="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Sign in to platform</h2>
      <form class="mt-8 space-y-6" @submit.prevent="login">
        <TextField
          label="Your Email"
          name="email"
          id="email"
          type="email"
          placeholder="name@company.com"
          v-model="email"
          :required="true"
          ref="emailField"
        >
        </TextField>

        <TextField
          label="Your Password"
          name="password"
          id="password"
          type="password"
          placeholder="••••••••"
          v-model="password"
          :required="true"
          ref="passwordField"
        >
        </TextField>

        <div class="flex items-start">
          <div class="flex items-center h-5">
            <CheckboxField name="remember" id="remember" v-model="remember" :required="true">
            </CheckboxField>
          </div>
          <div class="ml-3 text-sm">
            <label for="remember" class="font-medium text-gray-900 dark:text-white">
              Remember me
            </label>
          </div>
          <RouterLink
            :to="{ name: 'register' }"
            class="ml-auto text-sm text-primary-700 hover:underline"
          >
            Lost Password?
          </RouterLink>
        </div>

        <PrimaryButton label="Login to your account"></PrimaryButton>

        <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
          Not registered?
          <RouterLink
            :to="{ name: 'register' }"
            class="text-primary-700 hover:underline dark:text-primary-500"
          >
            Create account
          </RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TextField, PrimaryButton, CheckboxField } from '@/components/elements'
import { ref } from 'vue'
const email = ref('')
const password = ref('')

const remember = ref(false)
const emailField = ref<typeof TextField>()
const passwordField = ref<typeof TextField>()

const isValid = () => {
  if (emailField.value?.validate() && passwordField.value?.validate()) {
    return true
  }
  return false
}

const login = () => {
  try {
    if (isValid()) {
      console.log(email.value, password.value, remember.value)
    } else {
      console.log('error')
    }
  } catch (error) {
    console.log(error)
  }
}
</script>
