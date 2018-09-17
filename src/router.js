import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

// components
import Modal from './components/Modal.vue'
Vue.component('edm-modal', Modal)

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})
