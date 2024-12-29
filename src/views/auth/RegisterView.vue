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
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Create a Free Account</h2>
      <form class="mt-8 space-y-6" @submit.prevent="register">
        <TextField
          label="Your Full Name"
          name="name"
          id="name"
          type="name"
          placeholder="John Doe"
          v-model="name"
          :required="true"
          ref="nameField"
        >
        </TextField>

        <TextField
          label="Your Email"
          name="email"
          id="email"
          type="email"
          placeholder="name@company.com"
          v-model="email"
          :required="true"
          :pattern="emailPattern"
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
          :pattern="passwordPattern"
          ref="passwordField"
          :custom-error-message="'Password must contain at least 8 characters, at least one letter, at least one number, and at least one special character'"
        >
          >
        </TextField>

        <TextField
          label="Confirm Password"
          name="confirm_password"
          id="confirm_password"
          type="password"
          placeholder="••••••••"
          v-model="confirm_password"
          :required="true"
          ref="confirmPasswordField"
        >
        </TextField>
        <small v-if="confirmPasswordErrorMessage" class="text-red-500">{{
          confirmPasswordErrorMessage
        }}</small>

        <div class="flex items-start">
          <div class="flex items-center h-5">
            <CheckboxField
              name="remember"
              id="remember"
              v-model="remember"
              :required="true"
              ref="rememberField"
            >
            </CheckboxField>
          </div>
          <div class="ml-3 text-sm">
            <label for="remember" class="font-medium text-gray-900 dark:text-white">
              I accept the
              <a href="#" class="text-primary-700 hover:underline dark:text-primary-500">
                Terms and Conditions
              </a>
            </label>
          </div>
        </div>

        <PrimaryButton label="Create Account"></PrimaryButton>

        <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
          Already have an account?
          <RouterLink
            :to="{ name: 'login' }"
            class="text-primary-700 hover:underline dark:text-primary-500"
          >
            Login here
          </RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { TextField, PrimaryButton, CheckboxField } from '@/components/elements'
import { handleServerValidationErrors } from '@/helpers/utility'
import ajax from '@/stores/ajax'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

const name = ref('')
const email = ref('')
const password = ref('')
const confirm_password = ref('')
const remember = ref(false)

const emailPattern = '^\\S+@\\S+\\.\\S+$'
const passwordPattern = '^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%&? "]).*$'

const nameField = ref<typeof TextField>()
const emailField = ref<typeof TextField>()
const passwordField = ref<typeof TextField>()
const confirmPasswordField = ref<typeof TextField>()
const rememberField = ref<typeof CheckboxField>()

const confirmPasswordErrorMessage = ref('')

const isValid = () => {
  confirmPasswordErrorMessage.value = ''
  if (confirm_password.value.trim() !== '') {
    if (password.value.trim() !== confirm_password.value.trim()) {
      confirmPasswordErrorMessage.value = 'Passwords do not match'
      return false
    }
  }
  return (
    nameField.value?.validate() &&
    emailField.value?.validate() &&
    passwordField.value?.validate() &&
    confirmPasswordField.value?.validate() &&
    rememberField.value?.validate()
  )
}
const register = async () => {
  const userData = {
    name: name.value,
    email: email.value,
    password: password.value,
    confirm_password: confirm_password.value,
    remember_me: remember.value,
  }
  try {
    if (isValid()) {
      const ajaxObj = new ajax()
      const response = await ajaxObj.post('/register', userData)
      if (201 === response.status) {
        toast.success(response.data.message)
      }
    }
  } catch (error: any) {
    if (error && error.response && error.response.status === 422) {
      const formKeys = Object.keys(userData)
      const errors = error.response.data.errors
      handleServerValidationErrors(formKeys, errors)
    }
  }
}
</script>
