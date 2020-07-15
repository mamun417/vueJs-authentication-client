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
        next(to.path.substring(0, to.path.length - 1))
        return
    }

    //let login = store.getters['auth/isLoggedIn'];
    let login = localStorage.getItem('token');

    if (to.matched.some(record => record.meta.requiresAuth)) {

        if (login) {
            next()
        } else {
            next({name: 'login'})
        }

    } else if (to.matched.some(record => !record.meta.requiresAuth)) { // if authenticated

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
