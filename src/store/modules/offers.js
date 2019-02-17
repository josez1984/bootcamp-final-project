import axios from 'axios'

// initial state
const state = {        
  
}

// getters
const getters = {
  
}

// actions
const actions = {
  delete({commit}, payload) {
    return new Promise((resolve, reject)=>{
      axios.delete('/api/items', { data: payload })
      .then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  post({commit}, payload){
    return new Promise((resolve, reject)=>{
      axios.post('/api/offers', payload)
      .then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  get({commit}, payload){
    return new Promise((resolve, reject)=>{
      axios.get('/api/offers', payload)
      .then(res => {
        resolve(res)
      }).catch(err => { 
        reject(err)
      })
    })
  }
}

// mutations
const mutations = {
  
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
