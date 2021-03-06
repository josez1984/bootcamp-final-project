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
                v-model="this.id"              
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

              <v-select
                :disabled="statusSelectDisable"
                v-model="status"
                :items="statusItems"
                ref="status"
                label="Status">
              </v-select>

              <v-btn
                color="success"                
                type="submit">
                  {{ btnPostText }}
              </v-btn>   
              
              <v-btn
                v-if="this.id !== 0"
                color="success"
                @click="newItem">
                  New Item
              </v-btn>  

              <v-btn
                v-if="this.id !== 0"
                color="success"
                @click="removeItem">
                  Remove Item
              </v-btn>
              
              <v-carousel
                height="350">                
                <v-carousel-item                  
                  v-for="(image,i) in this.item.Images"
                  :key="i"
                  :src="image.url">
                </v-carousel-item>
              </v-carousel>
              
              <PictureUpload 
                @pictureUploaded="pictureUploaded">
              </PictureUpload>           
            </form>
          </v-card-text>

        </v-card>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import PictureUpload from '@/components/PictureUpload'

export default {
  components: {
    PictureUpload
  },   
  data: () => ({    
    statusSelectDisable: false,
    status: null,
    statusItems: [
      'Active',
      'Inactive'      
    ],
    btnPostText: 'Create New Item',  
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
    ...mapMutations(["items/currentId"]),  
    pictureUploaded() {
      this.fetchItems()  
    },  
    itemSelect(id) {    
      if(id === 0) { 
        return this.clear()
      }
      this["items/currentId"](id)
      this.id = id
      const item = this.items.find(el=>el.id === id)       
      this.item = item
      this.description = item.description
      this.name = item.name
      this.condition = item.condition
      this.btnPostText = 'Update Item'
      this.statusSelectDisable = false
      this.statusItems = [
        'Active',
        'Inactive'      
      ]
      if(this.statusItems.indexOf(item.status) < 0) {
        this.statusItems.push(item.status)
        this.statusSelectDisable = true
      }      
      this.status = item.status || 'Active'      
    },
    newItem() {
      this.clear()
    },
    removeItem(e) {
      if(this.id === 0) { return }      
      this.Loading(true)
      this.$store.dispatch('items/delete', {
        itemId: this.id
      }).then(res => {  
        this.clear()
        this.fetchItems()
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
        id: this.item.id,
        status: this.status
      }).then(res => {        
        this.Message("Item posted successfully.")
        this.fetchItems()
        this.clear()
      }).catch(err => {                
        this.Error("There was an error posting the new item.")
      });
    },
    fetchItems() {
      this.Loading(true)
      this.$store.dispatch('items/get')
      .then(res => {                  
        this.items = [{
          name: 'Select an Item',
          id: 0
        }]      
        this.items.push(...res.data)
        this.Message("'Items' fetched.")
        this.Loading(false)
        this.itemSelect(this.id)
      }).catch(err => {        
        this.Loading(false)
        this.Error("There was an error fetching 'Items'.")
      });
    },
    clear () {      
      this.btnPostText = 'Create New Item' 
      this.condition = ''
      this.item = {}
      this.id = 0
      this.name = ''
      this.description = '' 
      this.statusItems = [
        'Active',
        'Inactive'      
      ]  
      this.status = 'Active' 
      this.statusSelectDisable = false     
    }
  }
}
</script>

