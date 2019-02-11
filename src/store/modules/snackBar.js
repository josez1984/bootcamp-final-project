const state = {
  snackBar: {
    visible: false,
    text: null,
    timeout: 6000,
    multiline: false,
    type: 'success',
    autoHeight: false
  }
}

const mutations = {
  showSnackBar(state, payload) {    
    state.snackBar.text = payload.text
    state.snackBar.multiline = (payload.text.length > 50) ? true : false

    if(state.snackBar.multiline) {
      state.snackBar.autoHeight = true
    }

    if(payload.timeout) {
      state.snackBar.timeout = payload.timeout
    }

    if(payload.type) {
      state.snackBar.type = payload.type
    }

    state.snackBar.visible = true
  },
  closeSnackBar(state) {
    state.snackBar.visible = false 
    state.snackBar.multiline = false
    state.snackBar.timeout = 6000
    state.snackBar.text = null
    state.snackBar.type = 'success'
    state.snackBar.autoHeight = false
  }
}

// getters
const getters = {
  show: state => state.show,
  text: state => state.text,
  type: state => state.type  
}

// actions
const actions = {
  
}



export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
