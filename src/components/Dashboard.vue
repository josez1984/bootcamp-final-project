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
              <v-dialog v-model="dialog" persistent max-width="600px">
      <!-- <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn> -->
      <v-btn slot="activator" flat color="orange">I want this</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Contact the seller</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Legal first name*" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password*" type="password" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age*"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
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
      dialog: false,
      items: [],
      socket: io( {path: '/api/socket.io'})
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
