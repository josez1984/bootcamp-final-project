<template>
  <div>   
    <v-card>
      <v-card-title primary-title>
        <div>
          <h5 class="headline mb-0 text-xs-center">Pesonal Information</h5>            
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
            v-model="currentPassword"      
            label="Current Password"
            required
            type="password">
          </v-text-field> 

          <v-text-field
            v-model="newPassword"      
            label="New Password"
            required
            type="password">
          </v-text-field> 

          <v-text-field
            v-model="newPasswordConfirm"      
            label="Confirm New Password"
            required
            type="password">
          </v-text-field>          
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="success"
          @click="validate">
            Reset Password
        </v-btn>        
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  
  export default {
    name: 'ResetPassword',
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
      currentPassword: null,
      newPassword: null,
      newPasswordConfirm: null
    }),
    methods: {
      
    }
  }
</script>

