import 'babel-polyfill'
import Vue from 'vue'
import { mapMutations } from 'vuex'
import VueMaterial from 'vue-material'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuetify from 'vuetify'

// Styles
// import 'vue-material/dist/vue-material.min.css'
// import 'vue-material/dist/theme/default.css'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

import App from './App'
// import App from './components/App.vue'
import store from './store'
import { currency } from './currency'

// Components
import router from './router'
import Navbar from './components/Navbar'
import NavDrawerContent from './components/NavDrawerContent'
import Login from './components/Login'

Vue.filter('currency', currency)
Vue.use(Vuetify)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {  
  if(['Home','Sign Up'].indexOf(to.name) > -1) {
    next()
  } else if(localStorage.token) {
    next()
  } else {
    next(false)
  }
})

Vue.mixin({
  methods: {  
    ...mapMutations(["app/loading","snackBar/showSnackBar", "snackBar/closeSnackBar"]),    
    Error (text, timeout, multiline){
      this['snackBar/showSnackBar']({
        text: text,        
        type: 'error',
        timeout: timeout,
        multiline: multiline
      })
    },
    Message(text, timeout, multiline) {      
      this['snackBar/showSnackBar']({
        text: text,        
        type: 'info',
        timeout: timeout,
        multiline: multiline
      })
    },
    Loading(value) {
      console.log(this)
      this['app/loading'](value);
    }
  }
})

new Vue({
  el: '#app',
  router,
  store,
  components: { 
    App, 
    Navbar, 
    NavDrawerContent,
    Login    
  },
  template: '<App/>'
})

