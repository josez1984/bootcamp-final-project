import axios from 'axios'

// initial state
const state = {
  status: '',
  token: localStorage.getItem('token') || '',
  user: {},
  email: localStorage.getItem('email') || ''
}

// getters
const getters = {
  userAuth: state => !!state.token,
  authStatus: state => state.status,
  email: state => state.email
}

// actions
const actions = {
  logout({commit}){
    return new Promise((resolve, reject)=>{
      commit('logout')
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  },
  login({commit}, user){
    return new Promise((resolve, reject)=>{
      commit('request')
      axios.post(
        '/api/login', 
        user
      ).then(resp => {
        const token = resp.data.token
        const email = resp.data.userData[0].email
        localStorage.setItem('token',token)
        localStorage.setItem('email',email)
        axios.defaults.headers.common['x-access-token'] = token
        commit('success', {token, email})
        resolve(resp)
      }).catch(err => {
        commit('error')
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        reject(err)
      })
    })
  }
}

// mutations
const mutations = {
  request(state){
    state.status = 'loading'
  },
  success(state, data){
    state.status = 'success'
    state.token = data.token
    state.email = data.email
  },
  error(state){
    state.status = 'error'
  },
  logout(state){
    state.status = ''
    state.token = ''
    state.user = {},
    state.email = ''
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
