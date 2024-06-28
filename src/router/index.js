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
          name: 'followup',
          component: () => import('../views/EnvView.vue'),
          children:[
            {
              path: '',
              name: 'initial',
              component: () => import('../views/InitialView.vue')
            },
            {
              path: 'seguimento/:idFollowup',
              name: 'followup-unique',
              component: () => import('../views/FollowupView.vue')
            },
          ]
        }
      ]
    },
    {
      path: '/ambientes',
      // name: 'all-env',
      component: AppView,
      children: [
        {
          path: '',
          component: () => import('../views/AllEnvView.vue'),
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/not-found',
      name: 'not',
      component: () => import('../views/Not-Found.vue')
    },
    {
      path: '/:pathMatch(.*)',
      name: 'not-found',
      component: () => import('../views/Not-Found.vue')
    }
  ]
})

export default router
