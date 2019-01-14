<template>
  <PersonalView :items="items"/>
</template>

<script>
import PersonalView from '@/components/animations/PersonalView'

export default {
  name: 'Saved',
  components: {
    PersonalView
  },
  data () {
    return {
      items: [
        {
          action: '15 min',
          headline: 'Rainbow Gradient',
          title: 'Fast Rainbow Gradient',
          icon: 'looks',
          favorite: true
        },
        {
          action: '15 min',
          headline: 'Rainbow Gradient',
          title: 'Fast Rainbow Gradient',
          icon: 'looks',
          favorite: true
        },
        {
          action: '15 min',
          headline: 'Rainbow Gradient',
          title: 'Fast Rainbow Gradient',
          icon: 'looks',
          favorite: true
        },
        {
          action: '15 min',
          headline: 'Rainbow Gradient',
          title: 'Fast Rainbow Gradient',
          icon: 'looks',
          favorite: true
        },
      ]
    }
  }
}
</script>

<style>

</style>
