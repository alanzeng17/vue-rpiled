<template>
  <v-list two-line>
    <template v-for="item in items">
      <!-- <v-subheader>A</v-subheader> -->
      <v-divider/>
      <v-list-tile
        avatar
        two-line
        subheader
      >
        <!-- <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action> -->
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ item.headline}}</v-list-tile-sub-title>
        </v-list-tile-content>

        <!-- <v-list-tile-action>
          <v-list-tile-action-text>{{ item.action }}</v-list-tile-action-text>
        </v-list-tile-action> -->
        
        <v-list-tile-action>
          <v-btn fab dark small color="primary">
            <v-icon>mdi-lightbulb-on</v-icon>
          </v-btn>
        </v-list-tile-action>
         <v-list-tile-action>
          <v-icon v-if="item.favorite" color="red" @click="item.favorite=!item.favorite">mdi-heart</v-icon>
          <v-icon v-else  @click="item.favorite=!item.favorite">mdi-heart-outline</v-icon>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider/>
    </template>
  </v-list>
</template>

<script>
export default {
  name: 'PersonalView',
  data () {
    return {
      
    }
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  }
  
}
</script>

<style>

</style>

