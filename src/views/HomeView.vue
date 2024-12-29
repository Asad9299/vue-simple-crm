<template>
  <main>
    <h2>Hey, I am homepage!</h2>

    <PrimaryButton label="logout" @click="logout"></PrimaryButton>
  </main>
</template>

<script lang="ts" setup>
import { PrimaryButton } from '@/components/elements'
import { userStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const userStoreObj = userStore()
const router = useRouter()
const logout = () => {
  userStoreObj.removeUser()
  router.push({ name: 'login' })
}
</script>
