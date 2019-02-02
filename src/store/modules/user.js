import axios from 'axios'

// initial state
const state = {
  loading: false,
  user: {},
  error: false
}

// getters
const getters = {
  loading: state => state.loading,
  user: state => state.user,
  error: state => state.error
}

// actions
const actions = {
  fetchProfile({commit}){
    return new Promise((resolve, reject)=>{
      commit('loading', true);
      axios.get('/api/users/profile').then(resp => {                
        commit('loading', false);        
        resolve(resp.data);
      }).catch(err => {
        commit('loading', false);
        commit('error', true)        
        reject(err)
      })
    })
  }
}

// mutations
const mutations = {
  loading(state,status){state.loading=status},
  profile(state,data){state.user=data},
  error(state,status){state.error=status}
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
