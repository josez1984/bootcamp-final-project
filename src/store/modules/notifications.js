import axios from 'axios'

// initial state
const state = {      
  // loading: false
  // currentId: 0
  items: []
}

// getters
const getters = {
  items: state => state.items
}

// actions
const actions = {
  // delete({commit}, payload) {
  //   return new Promise((resolve, reject)=>{
  //     axios.delete('/api/items', { data: payload })
  //     .then(res => {
  //       resolve(res)
  //     }).catch(err => {
  //       reject(err)
  //     })
  //   })
  // },
  // post({commit}, payload){
  //   return new Promise((resolve, reject)=>{
  //     axios.post('/api/items', payload)
  //     .then(res => {
  //       resolve(res)
  //     }).catch(err => {
  //       reject(err)
  //     })
  //   })
  // },
  fetch({commit}, payload){
    console.log(payload)
    return new Promise((resolve, reject)=>{
      axios.get('/api/notifications')
      .then(res => {
        resolve(res)
      }).catch(err => { 
        reject(err)
      })
    })
  },
  // dashboard({commit}, payload){
  //   return new Promise((resolve, reject)=>{
  //     axios.get('/api/items/dashboard', payload)
  //     .then(res => {
  //       resolve(res)
  //     }).catch(err => { 
  //       reject(err)
  //     })
  //   })
  // },
  // postImage({commit}, payload){
  //   return new Promise((resolve, reject)=>{
  //     const currentId = this.state.items.currentId      
  //     var reader = new FileReader();
  //     reader.readAsDataURL(payload);
  //     reader.onload = function () {      
  //       let encoded = reader.result;        
  //       axios.post('/api/items/image', { 
  //         image: encoded,
  //         itemId: currentId
  //       }).then(resp => {                                
  //         resolve(resp.data);
  //       }).catch(err => {             
  //         reject(err)
  //       })
  //     };
  //     reader.onerror = function (error) {
  //       console.log('Error: ', error);
  //     };
  //   })
  // }
}

// mutations
const mutations = {
  set(state,payload){state.items=payload},  
  add(state,payload){state.items.push(payload)}
  // error(state,status){state.error=status},
  // currentId(state,id){state.currentId=id}
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
