<template>
    <v-layout>
      <v-flex>
        <v-card>
          <v-card-title primary-title>
            <h6 class="headline mb-0">Log in</h6>
          </v-card-title>

          <v-card-text>
            <form @submit.prevent="login">
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

              <v-btn
                color="success"                
                type="submit">
                Log in
              </v-btn>              
            </form>

            <v-btn
              color="success">
              Sign Up
            </v-btn>

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
      </v-flex>
    </v-layout>    
</template>

<style lang="css" scoped>
  
</style>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'

  export default {
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
      login() {
        this.loading = true
        let email = this.email
        let password = this.password
        this.$store.dispatch('auth/login', {
          email,
          password
        }).then((resp)=>{          
          this.alert.show = false          
          this.loading = false                    
          this.email = ''
          this.password = ''
          this.$router.push('/dashboard')
        }).catch((err)=>{     
          this.showErrorMessage('There was an error Login in.')               
          // this.alert.show = true
          // this.alert.text = 'There was an error login in.'
          // this.alert.type = 'error'
          this.loading = false
        })
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
