<template>
    <v-container grid-list-md text-xs-center>
    <v-layout row wrap>

      <v-flex xs12
          v-for="(item,i) in this.items"
          :key="i">
          <v-card>
            <v-carousel
              height="250">                
              <v-carousel-item                  
                v-for="(image,i) in item.Images"
                :key="i"
                :src="image.url">
              </v-carousel-item>              
            </v-carousel>            
            <v-card-title primary-title>
              <div>
                <div class="headline">{{ item.name }}</div>
                <span class="grey--text">{{ item.description }}</span>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat color="orange">Place Offer</v-btn>             
            </v-card-actions>
          </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  
</template>

<script>
  export default {
    name: 'Dashboard',
    data: () => ({
      items: [],
      socket: io( {path: '/api/socket.io'})
    }),
    mounted() {
      this.fetchItems()      

      this.socket.on('new_item', (data) => {
        console.log('DEBUG: New Item has been posted', data)        
        this.items.push(...data)
      });

      this.socket.on('update_item', (data) => {
        console.log('DEBUG: Items updated', data)        
        this.fetchItems()
      });
    },
    methods: {
      fetchItems() {
        this.Loading(true)
        this.$store.dispatch('items/dashboard')
        .then(res => {                       
          this.items = res.data
          this.Message("Dashboard data fetched.")
          this.Loading(false)                   
        }).catch(err => {        
          this.Loading(false)
          this.Error("There was an error fetching Dashboard data.")
        });
      },
    }
  }
</script>
