<template>
  <md-list-item>
    <md-icon>{{ mdIcon }}</md-icon>
    <span 
      class="md-list-item-text" v-on:click="$emit('navlink-click')">
      <router-link :to="routerLinkTo">
        {{ routerLinkText }}
      </router-link>
    </span>
  </md-list-item>
</template>

<script>
export default {
  name: 'Navlink',
  props: {
    mdIcon: String,
    routerLinkTo: String,
    routerLinkText: String
  },
  data: () => ({

  })
}
</script>

