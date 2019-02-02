import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Reports from '@/components/Reports'
import Dashboard from '@/components/Dashboard'
import Profile from '@/components/Profile'
import store from '../store';
import ResetPassword from '@/components/ResetPassword'
import PaymentMethods from '@/components/PaymentMethods'

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/reports',
      name: 'Reports',
      component: Reports,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/reset-password',
      name: 'Reset Password',
      component: ResetPassword,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/payment-methods',
      name: 'Payment Methods',
      component: PaymentMethods,
      meta: { 
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next)=>{
  if(to.matched.some(record => record.meta.requiresAuth)) {
    console.log(store.getters['auth/userAuth'])
    if(store.getters['auth/userAuth']) {
      next()
      return
    }
    next('/')
  } else {
    next()
  }
})

export default router