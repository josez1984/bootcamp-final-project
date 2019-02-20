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
        app
        extended
        extension-height="7">
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <v-toolbar-title></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>

        <v-menu bottom left offset-y>
          <v-btn slot="activator" icon>
            <v-badge right>
              <span v-if="nNotifications > 0" slot="badge">{{ nNotifications }}</span>
              <v-icon              
                color="grey lighten-1">
                  notifications
              </v-icon>
            </v-badge>
          </v-btn>

          <v-list two-line>
            <template v-for="(notification, index) in notifications">
              <v-list-tile
                :key="notification.header"
                avatar
                ripple
                @click="toggle(index)">

                <v-list-tile-content>                  
                  <v-list-tile-sub-title class="text--primary">{{ notification.header }}</v-list-tile-sub-title>
                  <v-list-tile-sub-title>{{ notification.message }}</v-list-tile-sub-title>
                </v-list-tile-content>

              </v-list-tile>
            </template>
          </v-list>
        </v-menu>
        
        <v-toolbar-side-icon @click.stop="drawerRight = !drawerRight"></v-toolbar-side-icon>

        <v-progress-linear 
          v-show="loading" 
          color="success"
          slot="extension" 
          :indeterminate="loading">          
        </v-progress-linear>
      </v-toolbar>
    
      <!-- App Content -->
      <v-content>        
        <v-container fill-height>
          <v-layout row wrap align-center>
            <v-flex class="text-xs-center">                            
              <router-view></router-view>              
            </v-flex>
          </v-layout>          
          <Snackbar/>
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
import Alert from './components/Alert'
import Snackbar from './components/Snackbar'

export default {
  name: 'App',
  props: {
    source: String
  },
  data: () => ({
    notifications: [],    
    signupLink: {
        icon: 'dashboard', 
        title: 'Sign Up', 
        link: '/signup'
      },      
    appName: "TradeMe",
    drawer: null,
    drawerRight: null,
    currentPage: '',
    currentPath: '',
    alert: {
        show: false,
        text: '',
        type: ''
    },
    socket: io({path: '/api/socket.io'})
  }),
  components: {
    NavDrawerContent,
    SideDrawerContent,
    Alert,
    Snackbar
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
    
    this.fetchNotifications();

    this.socket.on('new_notification', (data) => {        
      this.fetchNotifications()
    });
  },
  updated () {    
    this.currentPage = this.$router.currentRoute.name
    this.currentPath = this.$router.currentRoute.path
  },
  methods: {
    fetchNotifications() {      
      this.$store.dispatch('notifications/fetch').then((payload)=>{
        console.log('App.vue; notifications/fetch(); ',payload)
        this.notifications = payload.data
        // this.$store.commit('notifications/set', payload.data)  
      })
    },
    notificationViewed(notification) {

    },
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
    nNotifications () {
      return this.notifications.length
    },
    // notifications () {
    //   return this.$store.getters['notifications/items']
    // },
    loading() {      
      return this.$store.getters['app/loading']
    },
    userAuth () {
      return this.$store.getters['auth/userAuth']  
    },
    currentUser(){return this.$store.getters['auth/email']}
  }
}
</script>

