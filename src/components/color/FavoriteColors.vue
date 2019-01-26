<template>
  <swatch :favorites='true'></swatch>
</template>
<script>
import Swatch from '@/components/color/Swatch'

export default {
  name: 'Saved',
  components: {
    Swatch
  }
}
</script>
