<template>
  <div>   
    <v-card>
          <v-card-title primary-title>
            <h6 class="headline mb-0">Sign Up</h6>
          </v-card-title>

          <v-card-text>
            <form @submit.prevent="signup">
              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                label="E-mail"
                type="text"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()">
              </v-text-field>

              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required>
              </v-text-field>

              <v-text-field
                v-model="passwordConfirm"
                label="Confirm Password"
                type="password"
                required>
              </v-text-field>

              <v-btn
                color="success"                
                type="submit">
                Sign Up
              </v-btn>              
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
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'

  export default {
    mounted() {
      this.Message("Welcome to Trade me. We hold the largest selection of used goods in the world. Get started now with a free account!", 15000)
    },

    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(10) },
      email: { required, email },
      select: { required },
      checkbox: {
        checked (val) {
          return val
        }
      }
    },

    data: () => ({
      email: '',
      password: '',
      passwordConfirm: '',
      loading: false,      
      alert: {
        show: false,
        text: '',
        type: ''
      }
    }),

    computed: {
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      }
    },

    methods: {
      signup() {
        // this.hideError()
        this.loading = true
        let email = this.email
        let password = this.password
        let passwordConfirm = this.passwordConfirm
        if(password !== passwordConfirm) {
          this.loading = false;
          return this.Error('The passwords must match')
        }
        this.$store.dispatch('auth/signup', {
          email,
          password          
        }).then((resp)=>{          
          // this.alert.show = false          
          this.loading = false                              
          this.password = ''
          this.passwordConfirm = ''
          this.$router.push('/dashboard')
          this.Message(`Welcome ${this.email}. We are glad you decided to join us. Now just log in to your new account, and you can start uploading used items to trade with other users worldwide. Chances are someone in the world has that rare item you seek!!`, 10000, true)
          this.email = ''
        }).catch((err)=>{   
          console.log(err.message)  
          let msg = err.message || 'There was an error signin up.';
          this.Error(msg)                        
          this.loading = false
        })
      },
      hideError() {
        this.alert.show = false
      },
      showErrorMessage(text) {
        this.alert.show = true
        this.alert.text = text
        this.alert.type = 'error'
      },
      submit () {
        this.$v.$touch()
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

