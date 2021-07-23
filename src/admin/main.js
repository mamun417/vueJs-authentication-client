import Vue from "vue";
import App from "@/admin/App.vue";
import router from "@/admin/router";
import store from "@/admin/store";
import "@/partial/plugins";
import "@/admin/axios";
import "@/partial/helper";

Vue.config.productionTip = false;

Vue.component("Loader", () => import("@/admin/components/ui/loader"));
Vue.component("Pagination", () => import("@/admin/components/pagination/Pagination"));

// console.log('Admin wwwwww')

new Vue({
    router,
    store,
    render: (h) => h(App),
    watch: {
        $route: function (pre, val) {
            // console.log(pre)
            // console.log(val)
        }
    }
}).$mount("#app");
