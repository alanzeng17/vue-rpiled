<template>
  <div>
    <v-text-field
      required
      :rules="timeRules"
      label="Speed (ms)"
      v-model="data.time"
      @input="updateStoreInput"
      :placeholder="`Default: ${this.defaults.time}`"      
    ></v-text-field>
    <v-text-field
      required
      :rules="brightnessRules"
      label="Brightness"
      v-model="data.brightness"
      @input="updateStoreInput"
      :placeholder="`Default: ${this.defaults.brightness}`"      
    ></v-text-field>
    <color-option @colorChange="updateColorAndStore" :maxColors="1" :minColors="1"></color-option>
  </div>
</template>

<script>
import AnimationService from '@/services/AnimationService'
import AnimationFormStore from '@/stores/animationFormStore.js'
import ColorOption from '@/components/animations/ColorOption'

const fields = ['time', 'brightness', 'color']

export default {
  name: 'StrobeForm',
  props: {
    dialog: {
      required: true,
      type: Boolean,
    },
    template: {
      required: true,
      type: String
    },
    animation: {
      type: Object
    }
  },
  components: {
    ColorOption
  },
  data () {
    return {
      data: {},
      defaults: {},
      timeRules: [
        v => !!v || 'Time is required',
        v => /^[0-9]+$/.test(v) || 'Integers only'
      ],
      brightnessRules: [
        v => !!v || 'Brightness is required',
        v => /([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])/.test(v) || 'Integers 0-255 only'
      ]
    }
  },
  methods: {
    updateDataAndStore () {
      for (let i = 0; i<fields.length; i++) {
        // we have to use $set here because Vue cannot track object properties by default
        this.$set(this.data, fields[i], this.animation[fields[i]]);
        AnimationFormStore.data[fields[i]] = this.animation[fields[i]];
      }
    },
    // helper function to avoid direct mapping of component data to store
    updateStoreInput () {
      AnimationFormStore.data = this.data;
    },
    
    updateColorAndStore (colors) {
      this.data.color = parseInt(colors[0].slice(1), 16);
      console.log(this.data);
      this.updateStoreInput();
    },

    async loadDefaults () {
      let template = await AnimationService.retrieveTemplate(this.template);
      this.defaults = JSON.parse(template.defaults);
    }
  },
  async mounted () {
    await this.loadDefaults();
    // put data in the store and the form field
    if (this.animation) {
      this.updateDataAndStore(this.animation);
    } else {
      this.data = JSON.parse(JSON.stringify(this.defaults));
      this.updateStoreInput();
    }
  },
  watch: {
    // we watch dialog so we can update the field when someone clicks out of the box
    dialog: function () {
      if (this.animation) {
        this.updateDataAndStore(this.animation);
      } else {
        this.data = this.defaults;
        this.updateStoreInput();
      }
    }
  }
}
</script>

<style>

</style>
