import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toaster from './plugins/swal'
import vSelect from 'vue-select'
import './plugins/vue-lazyload'
import axios from './axios'
import './helper'

window.axios = axios;
window.toast = toaster;

Vue.config.productionTip = false

Vue.component('Loader', () => import('./components/ui/loader'))
Vue.component('Pagination', () => import('./components/pagination/Pagination'))

import VueNumber from 'vue-number-animation'
Vue.use(VueNumber)

Vue.component('v-select', vSelect)
import 'vue-select/dist/vue-select.css';

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
