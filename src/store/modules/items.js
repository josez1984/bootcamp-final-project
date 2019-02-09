import axios from 'axios'

// initial state
const state = {    
  error: false,
  // loading: false
}

// getters
const getters = {
  // loading: state => state.loading
}

// actions
const actions = {
  post({commit}, payload){
    return new Promise((resolve, reject)=>{
      axios.post('/api/items', payload)
      .then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  get({commit}, payload){
    return new Promise((resolve, reject)=>{
      axios.get('/api/items', payload)
      .then(res => {
        resolve(res)
      }).catch(err => { 
        reject(err)
      })
    })
  },
  postImage({commit}, payload){
    console.log('postImage items.js action')
    console.log(payload)
    
    return new Promise((resolve, reject)=>{
      commit('loading', true);

      var reader = new FileReader();
      reader.readAsDataURL(payload);
      reader.onload = function () {      
        let encoded = reader.result;
        // if ((encoded.length % 4) > 0) {
        //   encoded += '='.repeat(4 - (encoded.length % 4));
        // }
        console.log(encoded);
        axios.post('/api/items/image', { image: encoded }).then(resp => {                
          commit('loading', false);        
          resolve(resp.data);
        }).catch(err => {
          commit('loading', false);
          commit('error', true)        
          reject(err)
        })
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };

    })
  }
}

// mutations
const mutations = {
  loading(state,status){state.loading=status},  
  error(state,status){state.error=status}
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
