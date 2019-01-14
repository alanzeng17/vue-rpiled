<template>
  <v-list two-line subheader>
    <template v-for="item in items">
      <v-list-tile
        :key="item.title"
        avatar
        :to="item.route"
      >
        <v-list-tile-avatar>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-btn fab dark small color="primary" @click.stop.prevent="sendDefault(item.title)">
            <v-icon>mdi-lightbulb-on</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider/>
    </template>
  </v-list>
</template>

<script>
import AnimationAPI from '@/services/AnimationService'
import Api from '@/services/Api'

export default {
  data () {
    return {
      items: [
        { title: 'Rainbow Gradient', 
          subtitle: 'Rainbow across the strip.', 
          icon: 'gradient', 
          route:'/testRoute'
        },
        { title: 'Rainbow Strip', 
          subtitle: 'Rainbow with the entire strip.', 
          icon: 'looks', 
          route:'/tester'
        },
        { title: 'Strand Test', 
          subtitle: 'Cycle of testing animations.', 
          icon: 'mdi-test-tube',
          route:'/'
        },
        { title: 'Theater Chase',
          subtitle: 'Theater style lights.', 
          icon: 'mdi-filmstrip' 
        },
      ]
    }
  },
  
  methods: {
    async sendDefault(title) {
      // determine name of endpoint to hit
      let s = title.split(' ');
      s[0] = s[0].toLowerCase();
      title = s.join('');
      // send the request
      let response = await Api().post('animations/' + title)
      if (response.status == 200) {
        console.log(`Success! You sent a req for ${title}`);
      } else {
        console.log('Failure!');
      }
    }
  }
}
</script>

<style>

</style>
