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

    if (to.path !== '/' && to.path.slice(-1) === '/') {
        return next(to.path.substring(0, to.path.length - 1))
    }

    let login = store.getters['auth/isLoggedIn'];

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (login) {
            return next()
        }
        return next({name: 'login'})
    } else if (to.matched.some(record => !record.meta.requiresAuth) && login) { // if authenticated and logged-in
        return next({name: 'home'})
    }
    next() // make sure to always call next()!
})

export default router
