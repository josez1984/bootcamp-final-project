<template>
  <div>    
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
    </div>
  </div>   
</template>

<script>  
export default {
  name: 'SideDrawerContent',
  created() {
    this.menuItems = this.updateItems(this.$router.currentRoute)
  },
  props: {      
    currentPage: String,
    currentRoute: String
  },
  computed: {
    userAuth () {
      return this.$store.getters['auth/userAuth']  
    }    
  },
  data: () => ({ 
    menuItems: [],
    mainMenuItems: {
      Dashboard: {
        routeMap: [          
          '/filters',
          '/dashboard'
        ],
        menuItems: [
          {
            icon: 'home', 
            title: 'Filters', 
            link: '/filters'
          }
        ]
      },      
      Profile: {
        routeMap: [
          '/profile',
          '/reset-password',
          '/payment-methods',
          '/add-funds'
        ],
        menuItems: [
          {
            icon: 'home', 
            title: 'Profile', 
            link: '/profile'
          },
          {
            icon: 'person', 
            title: 'Reset Password', 
            link: '/reset-password'
          },
          {
            icon: 'timeline', 
            title: 'Payment Methods',  
            link: '/payment-methods'
          },
          {
            icon: 'dashboard', 
            title: 'Add Funds',  
            link: '/add-funds'
          }
        ]
      }
    }
  }),
  methods: {
    updateItems (to) {
      let items = [];
      const mainMenuItems = this.mainMenuItems;
      for (var key in mainMenuItems) {
        if (mainMenuItems.hasOwnProperty(key)) {
          const routeMap = mainMenuItems[key].routeMap;
          if(routeMap.indexOf(to.path) > -1) {
            items = mainMenuItems[key].menuItems;
            break;
          }
        }
      }
      return items;
    }
  },
  watch: {
    $route (to, from) {
      this.menuItems = this.updateItems(to);
    }
  } 
}
</script>

<style lang="css" scoped>
  
</style>