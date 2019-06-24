import Vue from 'vue'
import VueRouter from 'vue-router'

import {basicMiddleware, authMiddleware, guestMiddleware} from '../middleware/middleware'

import routes from './routes'

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes,
  linkExactActiveClass: 'nav-item active'
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? to.meta.title : 'Location API'

  if (to.meta.basic) {
    basicMiddleware(next)
  } else if (to.meta.auth) {
    authMiddleware(next, to)
  } else if (to.meta.guest) {
    guestMiddleware(next)
  } else {
    next()
  }
})

export default router
