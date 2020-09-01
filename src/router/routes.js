const routes = [
    {
        path: '/',
        meta: { requiresAuth: true },
        component: () => import('../views/layouts/MainLayout'),
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('../views/Home')
            },
            {
                path: 'products',
                name: 'product',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '../views/product/Products')
            },
            {
                path: 'skills',
                name: 'skills',
                component: () => import('../views/skill/Skills')
            },
            {
                path: 'profile',
                name: 'profile',
                component: () => import('../views/user/Profile')
            },
        ]
    },

    /*Auth routes*/
    {
        path: '/',
        meta: { requiresAuth: false },
        component: () => import('../views/layouts/AuthLayout'),
        children: [
            {
                path: 'register',
                name: 'register',
                component: () => import('../views/auth/Register')
            },
            {
                path: 'login',
                name: 'login',
                component: () => import('../views/auth/Login')
            },
            {
                path: 'password/forgot',
                name: 'password.email',
                component: () => import('../views/auth/passwords/Email')
            },
            {
                path: 'password/reset/:token',
                name: 'password.reset',
                component: () => import('../views/auth/passwords/Reset')
            },
        ]
    },

    {
        path: '*',
        component: () => import('../views/error/404')
    }
]

export default routes
