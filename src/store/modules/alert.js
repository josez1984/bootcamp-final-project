// initial state
const state = {
  show: false,
  text: '',
  type: '',
  autoClose: false
}

// getters
const getters = {
  show: state => state.show,
  text: state => state.text,
  type: state => state.type,
  autoClose: state => state.autoClose
}

// actions
const actions = {
  new({commit}, payload){    
    commit('newAlert', payload)
  },
  close({commit}){
    commit('closeAlert')
  }
}

// mutations
const mutations = {
  newAlert(state, payload){      
    state.text = payload.text
    state.type = payload.type || 'success'    
    state.show = false
    state.show = true
  },
  closeAlert(state) {
    state.show = false
    state.text = ''
    state.type = 'info'
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
