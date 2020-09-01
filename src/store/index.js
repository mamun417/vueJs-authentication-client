import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import product from './product'
import user from './user'
import skill from './skill'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        product,
        user,
        skill
    },

    strict: process.env.NODE_ENV !== 'production'
})
