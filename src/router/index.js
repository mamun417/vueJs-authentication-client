import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "./routes";
import store from '../store'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    let login = store.getters['auth/isLoggedIn'];

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (login) {
            next()
        } else {
            next({name: 'login'})
        }
    } else if (to.matched.some(record => !record.meta.requiresAuth)) {
        if (login) {
            next({name: 'home'})
        } else {
            next()
        }
    } else {
        next() // make sure to always call next()!
    }
})

export default router
