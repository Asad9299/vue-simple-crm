import ListView from '@/views/users/ListView.vue'

export const userRoutes = [
  {
    path: 'users',
    name: 'user.index',
    component: ListView,
    meta: {
      requiresAuth: true,
    },
  },
]
