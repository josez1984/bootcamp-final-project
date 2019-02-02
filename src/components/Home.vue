<template>
  <div>
    <img src="../assets/logo.png">        
    <h1>Trademe</h1>    
    <p>Welcome {{currentUser}}</p>    
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      currentUser: ''
    }
  },
  methods: {
    checkAuth () {
      if(localStorage.token && localStorage.currentUser) {
        this.currentUser = localStorage.currentUser
      }
    }
  },
  mounted () {
    this.checkAuth()
  },
  updated () {
    this.checkAuth()
  }
}
</script>