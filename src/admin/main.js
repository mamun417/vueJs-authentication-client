import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/plugins'
import '@/axios'
import '@/helper'

Vue.config.productionTip = false

Vue.component('Loader', () => import('@/components/ui/loader'))
Vue.component('Pagination', () => import('@/components/pagination/Pagination'))

console.log('Admin wwwwww')

new Vue({
    router,
    store,
    render: h => h(App),
    watch: {
        $route: function (pre, val) {
            console.log(pre)
            console.log(val)
        },
    }
}).$mount('#app')
