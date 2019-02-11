import axios from 'axios'

// initial state
const state = {
  currentPage: '',
  sideNavList: [],
  loading: false
}

// getters
const getters = {
  page: state => state.currentPage,
  sideNavList: state => state.sideNavList,
  loading: state => state.loading
}

// actions
const actions = {
  setSideNavList({commit}, payload){
    commit('sideNavList', payload)
  },
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
        axios.defaults.headers.common['Authorization'] = token
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
  loading(state, value) {    
    state.loading = value
  },
  sideNavList(state, payload){
    state.sideNavList = payload
  },
  request(state){
    state.status = 'loading'
  },
  success(state, payload){
    state.status = 'success'
    state.token = payload.token
    state.email = payload.email
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
