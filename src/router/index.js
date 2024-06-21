import { createRouter, createWebHistory } from 'vue-router'
import AppView from '../views/AppView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:name',
      name: 'app',
      component: AppView,
      children: [
        {
          path: '',
          name: 'process',
          component: () => import('../views/EnvView.vue'),
          children:[
            {
              path: 'processo/:idProcess',
              name: 'process-unique',
              component: () => import('../views/PocessView.vue')
            },
          ]
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/:pathMatch(.*)',
      name: 'not-found',
      component: () => import('../views/Not-Found.vue')
    }
  ]
})

export default router
