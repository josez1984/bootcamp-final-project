<template>
  <div>   
    <v-card>
          <v-card-title primary-title>
            <h6 class="headline mb-0">Items</h6>
          </v-card-title>

          <v-card-text>
            <form @submit.prevent="postItem">
              <v-select
                @change="itemSelect"
                :items="items"
                label="Existing Items"
                item-text="name"
                item-value="id">
              </v-select>

              <v-text-field
                v-model="name"                
                label="Name"
                type="text"
                ref="name"
                required>
              </v-text-field>
              
              <v-textarea
                solo
                v-model="description"       
                ref="description"         
                label="Description">
              </v-textarea>              

              <v-select
                v-model="condition"
                :items="conditions"
                ref="condition"
                label="Condition">
              </v-select>

              <v-btn
                color="success"                
                type="submit">
                  {{ btnPostText }}
              </v-btn>   
              
              <v-btn
                color="success"
                @click="newItem">
                  New
              </v-btn>  

              <v-btn
                color="success"
                @click="removeItem">
                  Remove
              </v-btn>

              <PictureUpload></PictureUpload>           
            </form>

            <!-- <v-progress-linear 
              v-show="loading" 
              :indeterminate="loading">
            </v-progress-linear> -->
          </v-card-text>

        </v-card>
  </div>
</template>



<script>
import PictureUpload from '@/components/PictureUpload'

export default {
  components: {
    PictureUpload
  },   
  data: () => ({
    btnPostText: 'Post',  
    condition: '',
    items: [],
    item: {},
    conditions: [
      'Never Opened',
      'Barely Used',
      'Slightly Used',
      'Very Used',
      'Cosmetic Wear',
      'Heavily Used, Working',
      'Heavily Used, Not Working'
    ],
    id: 0,
    name: '',
    description: '',
    loading: false,      
    alert: {
      show: false,
      text: '',
      type: ''
    }
  }),

  computed: {
    
  },

  mounted () {
    this.fetchItems()        
  },

  methods: {  
    // ...mapMutations(["snackBar/showSnackBar", "snackbar/closeSnackBar"]),    
    itemSelect(id) {    
      const item = this.items.find(el=>el.id === id)       
      this.item = item
      this.description = item.description
      this.name = item.name
      this.condition = item.condition
    },
    newItem() {
      this.btnPostText = 'Create New Item'
      this.Message("You updated Something",6000)
    },
    removeItem(e) {
      if(!this.item.id) { return }
      
      this.Loading(true)
      this.$store.dispatch('items/delete')
      .then(res => {  
        this.items = []      
        this.items = res.data
        this.Message("'Item' deleted.")
        this.Loading(false)
      }).catch(err => {        
        this.Loading(false)
        this.Error("There was an error deleting the item.")
      });
    },
    postItem(e) {
      this.$store.dispatch('items/post', {
        name: this.name,
        description: this.description,
        condition: this.condition,
        id: this.item.id
      }).then(res => {
        console.log(res)
        this.Message("Item posted successfully.")
        this.fetchItems()
      }).catch(err => {
        console.log(err)
      });
    },
    fetchItems() {
      this.Loading(true)
      this.$store.dispatch('items/get')
      .then(res => {  
        this.items = []      
        this.items = res.data
        this.Message("'Items' fetched.")
        this.Loading(false)
      }).catch(err => {        
        this.Loading(false)
        this.Error("There was an error fetching 'Items'.")
      });
    },
    addImage() {
      this.showErrorMessage('This is an upcoming feature.')
    },
    clear () {
      this.$v.$reset()
      this.password = ''
      this.email = ''        
      this.alert.show = false        
    }
  }
}
</script>

