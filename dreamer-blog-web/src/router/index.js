import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'default',
        component: () => import('../components/user/Login.vue')
    },

    {
        path: '/login',
        name: 'login',
        component: () => import('../components/user/Login.vue')
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import('../components/user/SignUp.vue')
    },

    {
        path: '/home',
        name: 'Home',
        redirect: '/welcome',/*子路由的重定向*/
        children: [
            {
                path: '/welcome',
                component: () => import('../components/Welcome.vue')
            },
            /*cloud account*/
            {
                path: '/cloud',
                component: () => import('../components/account/CloudAccount.vue')
            },
            /*social account*/
            {
                path: '/social',
                component: () => import('../components/account/SocialAccount.vue')
            }],

        component: () => import('../components/Home.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
