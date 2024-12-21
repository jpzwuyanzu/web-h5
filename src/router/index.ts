import { createWebHashHistory, createRouter } from 'vue-router'

import HomeView from '@/views/index.vue'
import Detail from '@/views/detail.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/detail', component: Detail },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router