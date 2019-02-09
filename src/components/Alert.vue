<template>
  <div>  
    <v-snackbar
      v-model="this.show"
      :color="this.type">
        {{ this.text }}
      <v-btn dark flat @click="close">
          Close
      </v-btn>
    </v-snackbar>    
  </div>
</template>

<script>
  export default {
       
    data: () => ({

    }),

    computed: {
      show(){return this.$store.getters['alert/show']},
      text(){return this.$store.getters['alert/text']},
      type(){return this.$store.getters['alert/type']}
    },

    methods: {      
      close() { this.$store.dispatch('alert/close') }
    }
  }
</script>

