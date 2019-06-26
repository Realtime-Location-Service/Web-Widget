// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import iziToast from './utils/iziToaster'
import store from './store/index'
import VueParticles from 'vue-particles'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './utils/interceptor'
window._ = require('lodash')

Vue.use(BootstrapVue)
Vue.use(iziToast)
Vue.use(VueParticles)

Vue.config.productionTip = false
Vue.prototype.$iziToast = iziToast

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
