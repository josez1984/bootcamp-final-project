<template>

  <v-snackbar
    v-model="snackbar.visible"
    :color="snackbar.type"
    :timeout="snackbar.timeout"
    :multi-line="snackbar.multiline"
    :auto-height="snackbar.autoHeight">
      {{ snackbar.text }}
    <v-btn dark flat @click="close">
        Close
    </v-btn>
  </v-snackbar>
  
</template>

<script>
export default {
  computed: {
    snackbar() {      
      return this.$store.state.snackBar.snackBar
    }
  },
  methods: {
    close() {
      this["snackBar/closeSnackBar"]()
    }
  }
}
</script>