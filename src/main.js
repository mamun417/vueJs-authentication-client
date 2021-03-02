import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/partial/plugins'
import '@/axios'
import '@/partial/helper'

Vue.config.productionTip = false

Vue.component('Loader', () => import('@/components/ui/loader'))
Vue.component('Pagination', () => import('@/components/pagination/Pagination'))

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
