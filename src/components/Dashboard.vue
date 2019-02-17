<template>
    <v-container grid-list-xl text-xs-center>
    <v-layout row wrap>

      <v-flex xs12 md6 lg4
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
              <v-dialog :disabled="!showIWantThisButton(item)" v-model="dialog" persistent max-width="600px">                
                <v-btn :disabled="!showIWantThisButton(item)" @click.prevent="iWantThisClick(item)" slot="activator" flat color="orange">{{ iWantThisBtnText(item) }}</v-btn>
                <v-card>                  
                  <v-card-title>
                    <span class="headline">Make your offer</span>
                  </v-card-title>                

                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        
                        <v-flex xs12>
                          <v-text-field
                            v-model="offer.dollarAmt"
                            label="Dollar amount"
                            hint="Dollar amount offered for the item."
                            persistent-hint
                            type="number">
                          </v-text-field>
                        </v-flex>

                        <v-flex xs12>
                          <v-select
                            v-model="offer.userItemsSelected"
                            :items="offer.userItems"
                            ref="itemsOffered"
                            label="Items Offered"
                            item-text="name"
                            item-value="id"
                            return-object
                            multiple>
                          </v-select>
                        </v-flex>

                        <v-flex xs12 sm6 md4>
                          <v-textarea
                            solo
                            v-model="offer.message"       
                            ref="message"         
                            label="Message">
                          </v-textarea> 
                        </v-flex>
                        
                      </v-layout>
                    </v-container>                    
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="info" @click="dialog = false">Cancel</v-btn>
                    <v-btn color="info" @click="postOffer">Post Offer</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>                                         
            </v-card-actions>
            <v-card-actions>
              <v-btn flat color="orange">Ask a question</v-btn>             
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
      offer: {
        dollarAmt: "0.00",
        userItems: [],
        userItemsSelected: [],        
        message: null,
        userIdReceiver: null
      },
      dialog: false,
      items: [], 
      item: {},     
      socket: io({path: '/api/socket.io'})
    }),
    mounted() {
      this.fetchItems()      

      this.socket.on('new_item', (data) => {        
        this.items.push(...data)
      });

      this.socket.on('update_item', (data) => {        
        this.fetchItems()
      });
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
        this.$store.dispatch('offers/post', payload)
        .then(res => {                                 
          this.Message("Offer posted")
          this.fetchItems()
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
        this.$store.dispatch('items/get', {
            status: 'Active'
        }).then(res => {                       
          this.offer.userItems = res.data                    
          this.Loading(false)                   
        }).catch(err => {        
          this.Loading(false)
          this.Error("There was an error fetching User items.")
        });
      },
      fetchItems() {
        this.Loading(true)
        this.$store.dispatch('items/dashboard')
        .then(res => {                       
          this.items = res.data          
          this.Loading(false)                   
        }).catch(err => {        
          this.Loading(false)
          this.Error("There was an error fetching Dashboard data.")
        });
      },
    }
  }
</script>
