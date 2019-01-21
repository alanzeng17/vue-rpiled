<template>
  <div>
    <v-dialog max-width="300" v-model="dialog">
      <AnimationForm 
        @cancelled="dialog=false;" 
        @update="loadAnimations"
        :template="clickedTemplate"
        :title="'Edit Animation'"
        :animation="clickedAnimation"
        :dialog="dialog"
      >
        <component :is="formComponent" :template="formTemplate" :animation="clickedAnimation" :dialog="dialog"></component>
      </AnimationForm>
    </v-dialog>
    <h2>Favorites</h2>
    <!-- <PersonalView :items="animations"/> -->
    <v-list two-line>
      <template v-for="item in animations">
        <v-divider/>
        <v-list-tile
          avatar
          two-line
          subheader
          @click="handleClick(item)"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ toDisplay(item.template) }}</v-list-tile-sub-title>
          </v-list-tile-content>
          
          <v-list-tile-action>
            <v-btn fab dark small color="primary" @click.stop="sendAnimation(item)">
              <v-icon>mdi-lightbulb-on</v-icon>
            </v-btn>
          </v-list-tile-action>
          <!-- <v-list-tile-action>
            <v-icon v-if="item.favorite" color="red" @click.stop="handleFavorite(item)">mdi-heart</v-icon>
            <v-icon v-else  @click.stop="handleFavorite(item)">mdi-heart-outline</v-icon>
          </v-list-tile-action> -->
        </v-list-tile>
        <v-divider/>
      </template>
    </v-list>
  </div>
</template>

<script>
import PersonalView from '@/components/animations/PersonalView'
import AnimationService from '@/services/AnimationService'
import FormMap from '@/components/animations/forms/FormMap'
import AnimationForm from '@/components/animations/AnimationForm'
import AnimationFormStore from '@/stores/animationFormStore'
import { toDisplay, ANIMATION_FIELDS } from '@/components/animations/utils'

export default {
  name: 'Favorites',
  components: {
    PersonalView,
    AnimationForm,
  },
  data () {
    return {
      dialog: false,
      clickedTemplate: '',
      formTemplate: '',
      clickedAnimation: null,
      formComponent: null,
      animations: [],
    }
  },
  watch: {
    dialog (val) {
      if (val === false) {
        AnimationFormStore.clear();
      }
    }
  },
  methods: {
    toDisplay,
    
    sendAnimation(animation) {
      // send the animation directly, unneccessary fields will be ignored by the request
      AnimationService.triggerAnimation(animation.template, animation);
    },

    async loadAnimations() {
      this.animations = await AnimationService.retrieveAnimations(true);
    },

    handleClick (animation) {
      this.dialog = true;
      this.clickedTemplate = this.toDisplay(animation.template);
      this.formTemplate = animation.template;
      this.formComponent = FormMap.forms[animation.template]; 
      this.clickedAnimation = animation;
    },
    
    handleFavorite (animation) {
      animation.favorite = !animation.favorite;
      let payload = { animation:animation }
      AnimationService.updateAnimation(payload)
    }
  },
  async mounted () {
    await this.loadAnimations()
    this.$emit('search', this.animations);
  },
}
</script>

<style>

</style>
