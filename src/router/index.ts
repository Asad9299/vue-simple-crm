import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from './auth'
import { userStore } from '@/stores/user'
import NotFoundView from '@/views/NotFoundView.vue'
import { productRoutes } from './products'
import AppLayout from '@/views/layout/AppLayout.vue'
import DashboardView from '@/components/DashboardView.vue'

const routes = [
  ...authRoutes,
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '/',
        name: 'home',
        component: DashboardView,
      },
      ...productRoutes,
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    component: NotFoundView,
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
