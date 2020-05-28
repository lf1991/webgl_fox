import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/Demo'
        },
        {
            path: '/Demo',
            name: 'Demo',
            component: () => import('./views/Demo.vue')
        },
    ]
})
