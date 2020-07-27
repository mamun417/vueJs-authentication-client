import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toaster from './plugins/swal'
import axios from './axios'
import './helper'

import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: 'dist/error.png',
    loading: '/assets/images/WelldocumentedRevolvingBass-size_restricted.gif',
    attempt: 1
})

/*
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: 'dist/error.png',
    loading: 'dist/loading.gif',
    attempt: 1
})
*/

window.axios = axios;
window.toast = toaster;

Vue.config.productionTip = false

Vue.component('Loader', () => import('./components/ui/loader'))

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
