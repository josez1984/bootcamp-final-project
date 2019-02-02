<template>
  <md-toolbar class="md-primary">
    <md-button class="md-icon-button" @click="showNavigation = true">
      <md-icon>menu</md-icon>
    </md-button>
    <span class="md-title">My Title</span>

    <div class="md-toolbar-section-end">
      <md-button @click="showSidepanel = true">Favorites</md-button>
    </div>
  </md-toolbar>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      brandText: 'Leads Connect',
      userAuth: false,
      currentUser: '',
      email: '',
      password: '',
      error: false
    }
  },
  updated () {
    this.updateAuth()
  },
  mounted () {
    this.updateAuth()
  },
  methods: {
    checkCurrentLogin () {
      if (localStorage.token) {
        this.$router.replace(this.$route.query.redirect || '/dashboard')
      }
    },
    login (e) {
      this.$http.post('/api/login', { email: this.email, password: this.password })
        .then(response => this.loginSuccessful(response))
        .catch(() => this.loginFailed())
    },
    loginSuccessful (res) {
      if (!res.data.token) {
        return this.loginFailed()        
      }

      localStorage.token = res.data.token
      localStorage.currentUser = this.email
      this.userAuth = true
      this.currentUser = this.email
      this.error = false
      this.$router.replace(this.$route.query.redirect || '/dashboard')
    },
    loginFailed () {
      this.error = 'Login failed!'
      this.userAuth = false
      this.currentUser = ''
      delete localStorage.token
      delete localStorage.currentUser
    },
    updateAuth () {
      if (!localStorage.token) {
        this.$router.push('/?redirect=' + this.$route.path)
        this.currentUser = ''
        this.userAuth = false
      } else {
        this.currentUser = ''
        this.userAuth = true
      }
    },
    logout () {
      delete localStorage.token
      delete localStorage.currentUser
      this.$router.replace('/home');
      this.userAuth = false;
      this.currentUser = '';
    }
  }
}
</script>
