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
                label="Existing Items">
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
                  New Item
              </v-btn>  

              <PictureUpload></PictureUpload>           
            </form>

            <v-progress-linear 
              v-show="loading" 
              :indeterminate="loading">
            </v-progress-linear>

            <v-alert
              v-model="alert.show"
              
              dismissible
              transition="scale-transition">
                {{ alert.text }}.
            </v-alert>
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
      items: [],
      condition: '',
      conditions: [
        'Never Opened',
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

    created () {
      this.$store.dispatch('items/get')
      .then(res => {
        console.log(res)
        this.state.items = res
      }).catch(err => {
        console.log(err)
        // this.showErrorMessage("There was an error fetching 'Items'.")

        // NEW ALERT LOGIC....
        this.$store.dispatch('alert/new', {
          text: "There was an error fetching 'Items'.",
          autoClose: true
        })
      });      
    },

    methods: {      
      itemSelect(e) {
        console.log(e)
        
      },
      newItem() {
        this.btnPostText = 'Create New Item'
        // NEW ALERT LOGIC....
        this.$store.dispatch('alert/new', {
          text: "There was an error fetching 'Items'.",
          autoClose: true,
          type: 'error'
        })
      },
      postItem(e) {
        console.log(e);
        this.$store.dispatch('items/post', {
          name: this.name,
          description: this.description,
          condition: this.condition
        }).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        });
      },
      addImage() {
        this.showErrorMessage('This is an upcoming feature.')
      },
      hideError() {
        this.alert.show = false
      },
      showErrorMessage(text) {
        this.alert.show = true
        this.alert.text = text
        this.alert.type = 'error'
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

