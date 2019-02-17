<template>
  <div>
    <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            {{ appName }}
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-divider></v-divider>

    <div v-show="userAuth">
      <v-list>
        <v-list-tile 
          v-for="item in menuItems" 
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-badge color="red" v-if="item.badge">
            <span slot="badge">{{ item.badge }}</span>
            <span>{{ item.title }}</span>
          </v-badge>
          <v-list-tile-content v-else>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list> 

      <v-divider></v-divider>

      <v-btn
        color="success"                
        @click.prevent="logout">
        Log Out
      </v-btn>
    </div>

    <login v-show="!userAuth"/>
  </div>   
</template>

<script>  
  import Login from './Login'

  export default {
    name: 'NavDrawerContent',
    props: {
      appName: String,
      welcomeAlert: Function
    },
    components: {
      Login
    },
    computed: {
      userAuth () {
        return this.$store.getters['auth/userAuth']  
      }      
    },
    data: () => ({
      menuItems: [{
          icon: 'home', 
          title: 'Home', 
          link: '/'
        },
        {
          icon: 'person', 
          title: 'Profile', 
          link: '/profile'
        },
        {
          icon: 'timeline', 
          title: 'Reports',  
          link: '/reports'
        },
        {
          icon: 'dashboard', 
          title: 'Dashboard',  
          link: '/dashboard'
        },
        {
          icon: 'dashboard',
          title: 'Items',
          link: '/items'
        },
        {
          icon: 'dashboard',
          title: 'Offers',
          link: '/offers'
        }
      ]
    }),
    methods: {
      logout () {
        this.$store.dispatch('auth/logout').then(()=>{
          this.$router.push('/')
        })
      }
    }
  }
</script>

<style lang="css" scoped>
  
</style>