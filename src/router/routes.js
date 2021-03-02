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
                component: () => import(/* webpackChunkName: "about" */ '../views/product/Products')
            },
            {
                path: 'profile',
                name: 'profile',
                component: () => import('../views/profile/Profile')
            },
            {
                path: 'users',
                name: 'user',
                component: () => import('../views/user/Users')
            },
            {
                path: 'tasks',
                name: 'task',
                component: () => import('../views/task/Tasks')
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
