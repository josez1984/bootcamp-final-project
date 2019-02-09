import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
import products from './modules/products'
import auth from './modules/auth'
import user from './modules/user'
import items from './modules/items'
import alert from './modules/alert'

// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    cart,
    products,
    auth,
    user,
    items,
    alert
  }
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
})
