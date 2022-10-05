import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes=[
    {
        path:'/',
        name:'home',
        title:'首页',
        component:()=>import('../views/Home.vue')
    },
    {
        path:'/about',
        name:'about',
        title:'关于',
        component:()=>import('../views/About.vue')
    }
]

const router = new Router({
    routes
})

export default router