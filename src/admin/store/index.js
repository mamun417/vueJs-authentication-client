import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import admin from "./admin";
import role from "./role";
import product from "./product";
import user from "./user";
import skill from "./skill";
import cart from "./cart";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        admin,
        role,
        product,
        user,
        skill,
        cart
    },

    strict: process.env.NODE_ENV !== "production"
});
