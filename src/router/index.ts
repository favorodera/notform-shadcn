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
    {
      path: '/input',
      name: 'input',
      meta: {
        title: 'Input',
      },
      component: () => import('@/views/input.vue'),
    },
    {
      path: '/textarea',
      name: 'textarea',
      meta: {
        title: 'Textarea',
      },
      component: () => import('@/views/textarea.vue'),
    },
    {
      path: '/select',
      name: 'select',
      meta: {
        title: 'Select',
      },
      component: () => import('@/views/select.vue'),
    },
    {
      path: '/checkbox',
      name: 'checkbox',
      meta: {
        title: 'Checkbox',
      },
      component: () => import('@/views/checkbox.vue'),
    },
    {
      path: '/radio-group',
      name: 'radio-group',
      meta: {
        title: 'Radio Group',
      },
      component: () => import('@/views/radio-group.vue'),
    },
  ],
})

export default router
