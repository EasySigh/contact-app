import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ContactInfo from '../views/ContactInfo.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/contact/:id', name: 'ContactInfo', component: ContactInfo }
]

const router = new VueRouter({
  mode: 'history',
  base: '/contact-app/',
  routes
})

export default router
