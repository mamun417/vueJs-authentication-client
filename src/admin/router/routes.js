const routes = [
    {
        path: "/admin",
        meta: { requiresAuth: true },
        component: () => import("../views/layouts/MainLayout"),
        children: [
            {
                path: "",
                name: "admin.home",
                component: () => import("../views/Home")
            },
            {
                path: "administration/users",
                name: "admin.administration.user",
                component: () => import("../../admin/views/administration/user/Users")
            },
            {
                path: "administration/roles",
                name: "admin.administration.role",
                component: () => import("../../admin/views/administration/role/Roles")
            },
            {
                path: "administration/roles/create",
                name: "admin.administration.role.create",
                component: () => import("../../admin/views/administration/role/RoleAddEdit")
            },
            {
                path: "products",
                name: "product",
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ "../views/product/Products")
            },
            {
                path: "skills",
                name: "skills",
                component: () => import("../views/skill/Skills")
            },
            {
                path: "profile",
                name: "profile",
                component: () => import("../views/user/Profile")
            },
            {
                path: "cart",
                name: "cart",
                component: () => import("../views/ecommerce/Products")
            },
            {
                path: "pdf",
                name: "pdf",
                component: () => import("../views/pdf/Pdf")
            }
        ]
    },

    /*Auth routes*/
    {
        path: "/admin",
        meta: { requiresAuth: false },
        component: () => import("../views/layouts/AuthLayout"),
        children: [
            {
                path: "register",
                name: "register",
                component: () => import("../views/auth/Register")
            },
            {
                path: "login",
                name: "login",
                component: () => import("../views/auth/Login")
            },
            {
                path: "login/social",
                name: "login.social",
                component: () => import("../views/auth/SocialLoginCallback")
            },
            {
                path: "password/forgot",
                name: "password.email",
                component: () => import("../views/auth/passwords/Email")
            },
            {
                path: "password/reset/:token",
                name: "password.reset",
                component: () => import("../views/auth/passwords/Reset")
            }
        ]
    },

    {
        path: "*",
        component: () => import("../views/error/404")
    }
];

export default routes;
