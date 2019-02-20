<template>
  <div>
    <img src="../assets/29d72517-1ec7-46cf-909d-7a320748706b.png">                    
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