<template>
  <div>   
    <v-card>
      <v-card-title primary-title>
        <div>
          <h5 class="headline mb-0 text-xs-center">Profile Information</h5>            
        </div>
      </v-card-title>

      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation>

          <v-text-field
            v-model="email"      
            label="E-mail"
            required
            readonly>
          </v-text-field>

          <v-text-field
            v-model="funds"      
            label="Funds"
            required
            readonly>
          </v-text-field>          
        </v-form>
      </v-card-text>

      <v-card-actions>
        
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  
  export default {
    created () {      
      this.loading = true;
      this.$store.dispatch('user/fetchProfile').then((resp)=>{        
        this.loading = false;
        this.email = resp.email;        
      }).catch((err)=>{        
        this.loading = false;        
      });
    },
    data: () => ({
      email: null,
      funds: null,
      menuItems: [{
          icon: 'home', 
          title: 'Profile', 
          link: '/profile'
        },
        {
          icon: 'home', 
          title: 'Payment Methods', 
          link: '/payment-methods'
        },
        {
          icon: 'person', 
          title: 'Reset Password', 
          link: '/reset-password'
        },
        {
          icon: 'timeline', 
          title: 'Add Funds',  
          link: '/add-funds'
        }
      ]
    }),
    methods: {
      
    }
  }
</script>

