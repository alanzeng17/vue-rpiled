<template>
  <div>
    <!-- <v-dialog max-width="300" v-model="dialog">
      <AnimationForm :template="'Rainbow Gradient'">
        <rainbow-gradient-form/>
      </AnimationForm>
    </v-dialog> -->
    <h3>Saved</h3>
    <PersonalView :items="animations"/>
  </div>
</template>

<script>
import PersonalView from '@/components/animations/PersonalView'
import AnimationService from '@/services/AnimationService'
// import AnimationForm from '@/components/animations/AnimationForm'

export default {
  name: 'Saved',
  components: {
    PersonalView,
    // AnimationForm,
    // RainbowGradientForm,
  },
  data () {
    return {
      dialog: false,
      animations: [],
    }
  },
  methods: {
    async loadAnimations() {
      this.animations = await AnimationService.retrieveAnimations();
    }
  },
  async mounted () {
    await this.loadAnimations()
  },
}
</script>

<style>

</style>
