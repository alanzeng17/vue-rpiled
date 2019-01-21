<template>
   <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <router-view @search="sendSearch"></router-view>
      </v-flex>
    </v-layout>
  </v-container> 
</template>

<script>
export default {
  name: 'Layout',
  methods: {
    sendSearch (animations) {
      this.$emit('search', animations);
    }
  }
}
</script>

<style>

</style>
