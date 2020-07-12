import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toaster from './plugins/toaster'
import axios from './axios'
import helper from './helper'

window.axios = axios;
window.toast = toaster;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
