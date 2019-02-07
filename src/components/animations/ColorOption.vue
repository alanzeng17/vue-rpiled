<template>
  <div>
    <v-layout v-if="variableColors" align-content-center >
      <v-flex>
        <v-btn small flat @click='addColor()'>+ Add Color</v-btn>
      </v-flex>
      <v-flex>
        <v-btn small flat @click='removeColor()'>- Remove Color</v-btn>
      </v-flex>
    </v-layout>
    <h2 v-else>Choose Color:</h2>
    <v-layout align-content-center row wrap>
      <v-flex
        v-for="n in numButtons"
        :key="n"
        xs4
      >
        <div class="form__field">
          <div class="form__input">
            <p> Color {{n}}: </p>
            <swatches 
              v-model="values[n-1]" 
              :colors="colors" 
              row-length=3
              background-color="#424242"
              :popover-to="getPopover(n)"
              show-fallback
            ></swatches>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Swatches from 'vue-swatches';
import "vue-swatches/dist/vue-swatches.min.css"
import ColorService from '@/services/ColorService'

export default {
  name: 'ColorOption',
  props: {
    minColors: {
      required: false,
      type: Number,
    },
    maxColors: {
      required: false,
      type: Number
    }
  },
  components: {
    Swatches
  },
  data: () => ({
    numButtons: 0,
    // maxColors: 9,
    // minColors: 0,
    color: '#1CA085',
    colors: ['#5E35B1', '#3949AB', '#1E88E5', '#039BE5', '#00ACC1', '#00897B', '#66BB6A', '#689F38', '#E65100'], // defaults
    values: ['#5E35B1', '#3949AB', '#1E88E5', '#039BE5', '#00ACC1', '#00897B', '#66BB6A', '#689F38', '#E65100'],
    inputColors: [],
    popover: 'right'
  }),
  computed: {
    variableColors: function () {
      return this.minColors !== this.maxColors;
    }
  },
  watch: {
    values (val) {
      this.$emit('colorChange', this.values);
    }
  },
  methods: {
    getRandomColor: function() {
     
    },
    getPopover(n) {
      if (n%3 == 0)
        return "left";
      else
        return "right";
    },
    componentToHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    },
    convertRGBtoHex(r, g, b) {
      return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    },
    addColor() {
      if (this.numButtons < this.maxColors)
        this.numButtons += 1;
      else
        alert('Max color limit reached!');
    },
    removeColor() {
      if (this.numButtons > this.minColors)
        this.numButtons -= 1;
      else
        alert('Cannot remove anymore colors!');
    },
    setupColors(newColors) {
      var c1 = [];
      var v1 = [];
      for(var i = 0; i < newColors.length; i++) {
        c1.push(newColors[i])
        v1.push(newColors[i])
      }
      this.colors = c1;
      this.values = v1;
    }
    
  },
  async mounted() {
    // Get relevant colors from backend
    await ColorService.retrieveColors(false)
    .then(response => {
      this.inputColors = response;
    }).catch(e => {
      console.log(e);
    });
  
    // Convert data into easily used array
    var newColors = [];
    for (var i = 0; i < this.inputColors.length; i++) {
      var r = this.inputColors[i].r;
      var g = this.inputColors[i].g;
      var b = this.inputColors[i].b;
      var hex = this.convertRGBtoHex(r, g, b);
      newColors.push(hex);
    }
    console.log(newColors);
    this.setupColors(newColors);
    
    for(let i = 0; i<this.minColors; i++){
      this.addColor();
    }
  }
}
</script>

<style>

</style>
