import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/Mountain'
        },
        {
            path: '/Mountain',
            name: 'Mountain',
            component: () => import('./views/Mountain.vue')
        },
        {
            path: '/Wind',
            name: 'Wind',
            component: () => import('./views/Wind.vue')
        },
        {
            path: '/Plotting',
            name: 'Ploting',
            component: () => import('./views/Plotting.vue')
        },
        {
            path: '/WebGL',
            name: 'WebGL',
            component: () => import('./views/WebGL.vue')
        },
        {
            path: '/Demo',
            name: 'Demo',
            component: () => import('./views/Demo.vue')
        }
    ]
})
