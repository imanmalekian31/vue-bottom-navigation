import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Settings from '../views/Settings.vue'
import Notification from '../views/Notification.vue'
import Profile from '../views/Profile.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/settings',
    component: Settings
  },
  {
    path: '/notification',
    component: Notification
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/about',
    component: About
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
