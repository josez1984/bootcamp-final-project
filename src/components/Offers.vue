<template>
    <v-container grid-list-xl text-xs-center>
    <v-subheader>My Offers</v-subheader>
    <v-layout row wrap>

      <v-flex xs12 md6 lg4
          v-for="(offer,i) in this.offers"
          :key="i">
          <v-card>
            <v-card-title primary-title>
              <div>
                <div class="headline">{{ offer.useremail }}</div>
                <span class="grey--text">{{ offer.message }}</span>
              </div>
            </v-card-title>
            <!-- <v-carousel
              height="150"
              max-width="250">                
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
              <v-btn :disabled="!showIWantThisButton(item)" @click.prevent="iWantThisClick(item)" slot="activator" flat color="orange">{{ iWantThisBtnText(item) }}</v-btn>                
            </v-card-actions>
            <v-card-actions>
              <v-btn flat color="orange">Ask a question</v-btn>             
            </v-card-actions> -->
          </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  
</template>

<script>
  export default {
    name: 'Offers',
    data: () => ({
      offers: [],
      socket: io({path: '/api/socket.io'})
    }),
    mounted() {
      this.fetchOffers()      

      // this.socket.on('new_item', (data) => {        
      //   this.items.push(...data)
      // });

      // this.socket.on('update_item', (data) => {        
      //   this.fetchOffers()
      // });
    },
    methods: {
      iWantThisBtnText(item) {
        switch(item.status) {
          case 'Active': return 'I want This'
          default: return item.status
        }
      },      
      showIWantThisButton(item) {        
        return (item.status === 'Active') ? true : false
      },
      postOffer() {     
        const payload = {
          offeredItems: this.offer.userItemsSelected,
          dollarAmt: this.offer.dollarAmt,
          message: this.offer.message,
          userIdReceiver: this.offer.userIdReceiver,
          status: this.offer.status,
          itemId: this.item.id,
          item: this.offer.item
        }
        console.log(payload)   
        this.$store.dispatch('offers/post', payload)
        .then(res => {                                 
          this.Message("Offer posted")
          this.Loading(false)                   
        }).catch(err => {        
          this.Loading(false)
          this.Error("There was an error posting the Offer")
        });

        this.dialog = false
      },
      iWantThisClick(item) {
        if(item.status !== 'Active') {
          alert(item.status)
          const self = this
          setTimeout(()=>{
            self.dialog = false
          },5)          
        }
        this.fetchMyItems()
        this.item = item        
        this.offer.item = item
      },
      fetchMyItems() {
        this.Loading(true)
        this.$store.dispatch('items/get')
        .then(res => {                       
          this.offer.userItems = res.data          
          this.Message("User items fetched.")
          this.Loading(false)                   
        }).catch(err => {        
          this.Loading(false)
          this.Error("There was an error fetching User items.")
        });
      },
      fetchOffers() {
        this.Loading(true)
        this.$store.dispatch('offers/get')
        .then(res => {          
          console.log(res)             
          this.offers = res.data
          this.Message("Offers data fetched.")
          this.Loading(false)                   
        }).catch(err => {        
          this.Loading(false)
          this.Error("There was an error fetching Offers data.")
        });
      },
    }
  }
</script>
