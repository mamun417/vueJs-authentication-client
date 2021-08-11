import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "../store";
import ability from "../../partial/plugins/acl/ability";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

router.beforeEach(async (to, from, next) => {
    if (to.path !== "/" && to.path.slice(-1) === "/") {
        return next(to.path.substring(0, to.path.length - 1));
    }

    // no way ?
    const check = await store.getters["user/getPermissionsStatus"];

    console.log({ check });

    const canNavigate = to.matched.some((record) => {
        console.log({ sss: record.meta.gate });
        if (!record.meta.gate) next();

        if (check) {
            return ability.can(record.meta.gate);
        }
    });

    console.log({ canNavigate });

    let login = store.getters["auth/isLoggedIn"];

    to.matched.some((record) => {
        if (record.meta.requiresAuth) {
            if (login) next();
            else next({ name: "login" });
        } else if (!record.meta.requiresAuth && record.meta.redirectDashboard && login) {
            // if not require authenticate, redirectDashboard and logged-in (solve 404 page)
            if (to.path === "/") location.href = to.path;
            else next({ name: "admin.home" });
        } else {
            next(); // make sure to always call next()!
        }
    });
});

export default router;
