import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import AboutPage from '../views/AboutPage.vue'
import LeaderBoardPage from '../views/LeaderBoardPage.vue'
import ContactPage from '../views/ContactPage.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: LandingPage
        },
        {
            path: '/leaderboard',
            name: 'leaderboard',
            component: LeaderBoardPage
        },
        {
            path: '/contact',
            name: 'contact',
            component: ContactPage
        },
        {
            path: '/about',
            name: 'about',
            component: AboutPage
        }
    ]
})

export default router