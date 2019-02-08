<template>
  <div>   
    <v-card>
          <v-card-title primary-title>
            <h6 class="headline mb-0">Items</h6>
          </v-card-title>

          <v-card-text>
            <form @submit.prevent="postItem">
              <v-select
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
                :items="conditions"
                ref="condition"
                label="Condition">
              </v-select>

              <v-btn
                color="success"                
                type="submit">
                  Update
              </v-btn>   

              <PictureUpload></PictureUpload>           
            </form>

            <v-progress-linear 
              v-show="loading" 
              :indeterminate="loading">
            </v-progress-linear>

            <v-alert
              v-model="alert.show"
              :type="alert.type"
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
      items: [],
      conditions: [
        'Never Opened',
        'Slightly Used',
        'Very Used',
        'Cosmetic Wear',
        'Heavily Used, Working',
        'Heavily Used, Not Working'
      ],
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

    methods: {      
      postItem(e) {
        console.log(e);
        
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

