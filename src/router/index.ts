import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { authRoutes } from './auth'
import { userStore } from '@/stores/user'

const routes = [
  ...authRoutes,
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach((to, from, next: any) => {
  const userStoreObj = userStore()
  if (to.meta.requiresAuth && !userStoreObj.userData.authToken) {
    next({ name: 'login' })
  } else if (userStoreObj.userData.authToken && !to.meta.requiresAuth) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
