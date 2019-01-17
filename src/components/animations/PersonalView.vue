<template>
  <v-list two-line>
    <template v-for="item in items">
      <v-divider/>
      <v-list-tile
        avatar
        two-line
        subheader
      >
        <v-list-tile-content>
          <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ toDisplay(item.template) }}</v-list-tile-sub-title>
        </v-list-tile-content>
        
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
import { toDisplay } from '@/components/animations/utils'

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
  },
  methods: {
    toDisplay,
  }
}
</script>

<style>

</style>

