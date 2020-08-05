import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toaster from './plugins/swal'
import Paginate from 'vuejs-paginate'
import './plugins/vue-lazyload'
import axios from './axios'
import './helper'

window.axios = axios;
window.toast = toaster;

Vue.config.productionTip = false

Vue.component('Loader', () => import('./components/ui/loader'))
Vue.component('paginate', Paginate)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
