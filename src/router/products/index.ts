import ListView from '@/views/products/ListView.vue'

export const productRoutes = [
  {
    path: '/products',
    name: 'product.index',
    component: ListView,
    meta: {
      requiresAuth: true,
    },
  },
]
