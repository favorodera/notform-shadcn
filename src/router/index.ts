import { createRouter, createWebHistory } from 'vue-router'
import Demo from '@/views/demo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'demo',
      meta: {
        title: 'Demo',
      },
      component: Demo,
    },
  ],
})

export default router
