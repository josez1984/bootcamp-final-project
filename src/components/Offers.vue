<template>
    <v-container grid-list-xl text-xs-center>
    <v-subheader>My Offers</v-subheader>
    <v-layout row wrap>

      <v-flex xs12
          v-for="(offer,i) in this.offers"
          :key="i">
          <v-card>          
          <v-card-text>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title># {{ i + 1 }}</v-list-tile-title>
                <v-list-tile-title>{{ offerOriginatorText(offer) }}</v-list-tile-title>                
              </v-list-tile-content>
            </v-list-tile>

            <v-divider></v-divider>

            <form @submit.prevent="postItem">
              <v-text-field
                v-model="offer.dollarAmt"                
                label="$ Offered"
                type="number"
                ref="amt_offered"
                readonly
                required>
              </v-text-field>

              <v-list three-line>
                <v-subheader                   
                  :key="index">
                    Offered Items
                    <v-divider></v-divider>
                </v-subheader>                

                <template v-for="(item, index) in offer.items">                  
                  <v-list-tile                   
                    :key="index">
                    <v-list-tile-avatar
                      size="48px"
                      tile="true">
                        <img :src="item.imageUrl">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title v-html="item.name"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="item.description"></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>

                <v-subheader                   
                  :key="index">
                    Trading For
                    <v-divider></v-divider>
                </v-subheader>
                
                <v-list-tile>
                  <v-list-tile-avatar
                    size="48px"
                    tile="true">
                      <img :src="offer.itemImgUrl">
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title v-html="offer.itemName"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="offer.itemDescription"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>

            </form>
          </v-card-text>

          <v-card-actions v-if="showOfferActionBtns(offer)">            
            <v-btn color="success" @click="acceptOffer(offer)">Accept</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="rejectOffer(offer)">Reject</v-btn>
          </v-card-actions>
          
          <v-subheader v-else :key="index">
              Status: {{ offer.status }}
              <v-divider></v-divider>
          </v-subheader>   
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
    computed: {
      authEmail () {
        return this.$store.getters['auth/email']
      }
    },
    mounted() {
      this.fetchOffers()      

      this.socket.on('offer_update', (payload) => {        
        this.fetchOffers()
        if(payload.acceptanceUserId !== this.authEmail) {
          if(payload.action === 'OFFER_ACCEPTED') {
            alert("Yay, an offer was accepted")                        
          }
        }
      });

      this.socket.on('update_offer', (data) => {        
        this.fetchOffers()
      });
    },
    methods: {
      acceptOffer(offer) {        
        const payload = {
          id: offer.id,
          userEmail: this.authEmail
        }
        this.loading = true
        this.$store.dispatch('offers/accept', payload)
        .then(res => {                                 
          this.Message("Offer Accepted")
          this.Loading(false)                   
        }).catch(err => {        
          this.Loading(false)
          this.Error("There was an error accepting the Offer")
        });        
      },
      showOfferActionBtns(offer) {
        const currentUserSender = this.senderCurrentUser(offer)
        if(offer.status === 'Response Pending' && currentUserSender) {
          return true  
        }
        return false        
      },
      senderCurrentUser(offer) {
        return (offer.useremail !== this.authEmail) ? true : false
      },
      offerOriginatorText(offer) {
        if(offer.useremail === this.authEmail) {
          return 'To: ' + offer.userreceiveremail
        } else {
          return 'From: ' + offer.useremail
        }
      },
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
