import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    { path: '/login', component: () => import('../views/Login.vue') },
    {
        path: '/', component: () => import('../views/Login.vue')
        
    },
    {path: '/home', component: () => import('../views/home/Home.vue')}
]

const router = new VueRouter({routes})

export default router