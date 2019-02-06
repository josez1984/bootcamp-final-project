<template>
  <div id="app">
    <v-app id="inspire">

      <!-- App Left Nav Drawer -->
      <v-navigation-drawer
        v-model="drawer"
        fixed
        app
        width=240>
          <NavDrawerContent 
            :appName="appName"
            :welcomeAlert="welcome"/>                
      </v-navigation-drawer>
      
      <!-- App Right Nav Drawer -->
      <v-navigation-drawer
        v-model="drawerRight"
        fixed
        right
        app
        width=240>
          <SideDrawerContent
            :currentUser="currentUser"/>
      </v-navigation-drawer>

      <!-- App Toolbar -->
      <v-toolbar
        color="blue-grey"
        dark        
        app>
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <v-toolbar-title></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>

        <v-btn icon>
          <v-badge right>
            <span slot="badge">{{ nNotifications }}</span>
            <v-icon              
              color="grey lighten-1">
                notifications
            </v-icon>
          </v-badge>
        </v-btn>    

        <v-toolbar-side-icon @click.stop="drawerRight = !drawerRight"></v-toolbar-side-icon>
      </v-toolbar>
      
      <!-- App Content -->
      <v-content>
        <v-container            
          fill-height>
          <v-layout row wrap align-center>
            <v-flex class="text-xs-center">
              <router-view></router-view>
              <v-alert
                  v-model="alert.show"
                  :type="alert.type"
                  dismissible
                  transition="scale-transition">
                    {{ alert.text }}.
              </v-alert>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      
      <!-- App Footer -->
      <v-footer color="blue-grey" class="white--text" app>
        <span>TradeMe</span>
        <v-spacer></v-spacer>
        <span>&copy; 2017</span>
      </v-footer>

    </v-app>
  </div>
</template>

<style lang="css" scoped>
  
</style>

<script>
import NavDrawerContent from './components/NavDrawerContent'
import SideDrawerContent from './components/SideDrawerContent'

export default {
  name: 'App',
  props: {
    source: String
  },
  data: () => ({  
    signupLink: {
        icon: 'dashboard', 
        title: 'Sign Up', 
        link: '/signup'
      },  
    nNotifications: 5,
    appName: "TradeMe",
    drawer: null,
    drawerRight: null,
    currentPage: '',
    currentPath: '',
    alert: {
        show: false,
        text: '',
        type: ''
    }
  }),
  components: {
    NavDrawerContent,
    SideDrawerContent
  },
  created () {
    this.currentPage = this.$router.currentRoute.name
    this.currentPath = this.$router.currentRoute.path
    if(localStorage.getItem('token')) {
      this.$http.defaults.headers.common['x-access-token'] = localStorage.getItem('token')
    } 
    
    this.$http.interceptors.response.use(undefined,(err)=>{
      return new Promise((resolve, reject)=>{
        if(err.status === 401) {
          this.$store.dispatch('auth/logout')
        }
        throw err;
      })
    })
  },
  updated () {    
    this.currentPage = this.$router.currentRoute.name
    this.currentPath = this.$router.currentRoute.path
  },
  methods: {
    welcome () {
      this.alert.text = `Welcome back ${this.currentUser}`
      this.alert.type = 'success'
      ths.alert.show = true
    },
    logout () {
      this.$store.dispatch('auth/logout').then(()=>{
        this.$router.push('/')
      })
    }
  },
  computed: {
    userAuth () {
      return this.$store.getters['auth/userAuth']  
    },
    currentUser(){return this.$store.getters['auth/email']}
  }
}
</script>

