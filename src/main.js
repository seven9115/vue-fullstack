import './assets/style/public.css'
import './assets/style/style.css'
import './assets/js/rem'
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import api from './fetch/api'

Vue.use(VueRouter)
const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const reg = /^\/admin/
  if (reg.test(to.path)) {
    if (localStorage.token) {
      api.authTokenApi().then(res => {
        if (res.errorCode === 0) {
          next()
        } else {
          next('/login')
          return false
        }
      })
    } else {
      next('/login')
      return false
    }
  } else {
    next()
  }
})

new Vue({
  router
}).$mount('#app')
