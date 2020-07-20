import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toaster from './plugins/swal'
import axios from './axios'
import './helper'

window.axios = axios;
window.toast = toaster;

Vue.config.productionTip = false

Vue.component('Loader', () => import('./components/ui/loader'))

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
