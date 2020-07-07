const routes = [
    {
        path: '/',
        component: () => import('../layouts/MainLayout'),
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('../views/Home')
            },
            {
                path: 'about',
                name: 'about',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
            },
        ]
    },

    /*Auth routes*/
    {
        path: '/',
        component: () => import('../layouts/AuthLayout'),
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import('../views/auth/Login')
            },
            {
                path: 'reset/password',
                name: 'email',
                component: () => import('../views/auth/passwords/Email')
            },
            {
                path: 'register',
                name: 'register',
                component: () => import('../views/auth/Register')
            },
        ]
    },

    {
        path: '*',
        component: () => import('../views/404')
    }
]

export default routes
