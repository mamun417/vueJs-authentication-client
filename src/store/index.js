import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import user from './user'
import profile from './profile'
import task from './task'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        user,
        task,
        profile
    },

    strict: process.env.NODE_ENV !== 'production'
})
