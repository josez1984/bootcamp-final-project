// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueMaterial from 'vue-material'
import axios from 'axios'
import VueAxios from 'vue-axios'

// Styles
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

// Components
import App from './App'
import router from './router'
import Navbar from './components/Navbar'
import Drawer from './components/Drawer'

Vue.use(VueMaterial)
Vue.use(VueAxios, axios)

router.beforeEach((to, from, next) => {  
  if(to.name === 'Home') {
    next()
  } else if(localStorage.token) {
    next()
  } else {
    next(false)
  }
})

// import axios from './backend/vue-axios'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App, Navbar, Drawer },
  template: '<App/>'
})
