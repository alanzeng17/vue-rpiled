<template>
  <div>
    <v-text-field
      required
      label="Speed (ms)"
      v-model="data.time"
    ></v-text-field>
  </div>
</template>

<script>
import AnimationFormStore from '../../../stores/animationFormStore.js'

export default {
  name: 'RainbowGradientForm',
  data () {
    return {
      data: AnimationFormStore.data,
    }
  },
}
</script>

<style>

</style>
