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
        name: 'home',
        component: () => import('../components/Home.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
