<template>
  <v-layout row justify-center>
      <v-card width="22.5em">
          <v-flex v-if="favorite == 0" >
            <v-btn flat icon color="grey" @click="toggle()">
              <v-icon>favorite</v-icon>
            </v-btn>
          </v-flex>
          <v-flex v-else >
            <v-btn flat icon color="red" @click="toggle()">
              <v-icon>favorite</v-icon>
            </v-btn>
          </v-flex>
          <v-layout row justify-center>
            <h1>{{hexVal}}</h1>
          </v-layout>
          <v-layout row justify-center>
            <v-card height="7em" width="7em" flat tile :color="hexVal"></v-card>
          </v-layout>
          <v-flex>
            <v-slider 
              style='position: relative; width: 85%; left:10%; top: -.2em;'
              :thumb-label="true"
              track-color="red"
              color="red"
              thumb-color="red"
              :thumb-size="32"
              :max="255"
              v-model="redVal"
            ></v-slider>
            <v-slider 
              style='position: relative; width: 85%; left:10%; top: -.2em;'
              :thumb-label="true"
              track-color="green"
              color="green"
              thumb-color="green"
              :thumb-size="32"
              :max="255"
              v-model="greenVal"
            ></v-slider>
            <v-slider 
              style='position: relative; width: 85%; left:10%; top: -.2em;'
              :thumb-label="true"
              track-color="blue"
              color="blue"
              thumb-color="blue"
              :thumb-size="32"
              :max="255"
              v-model="blueVal"
            ></v-slider>
          </v-flex>
        <v-card-actions>
          <v-layout justify-space-between style="margin-left:1em; margin-right: 1em;">
            <v-btn color="error" @click="clicked()">Delete</v-btn>
            <v-btn fab dark small color="primary" @click="clicked()">
              <v-icon>mdi-lightbulb-on</v-icon>
            </v-btn>
            <v-btn color="success" @click="save()">Save</v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
  </v-layout>
</template>

<script>
import ColorService from '@/services/ColorService'

export default {
  name: 'Swatch',
  props: {
    dialog: {
      required: true,
      type: Boolean
    },
    hex: {
      required: true,
      type: String,
      default: "#000000"
    },
    id: {
      required: true,
      type: Number,
      default: -1
    },
    favorite: {
      required: true,
      type: Number,
      default: 0
    },
    r: {
      required: true,
      type: Number,
      default: 0
    },
    g: {
      required: true,
      type: Number,
      default: 0
    },
    b: {
      required: true,
      type: Number,
      default: 0
    }
  },
  components: {
  },
  data: () => ({
    redVal: 0,
    greenVal: 0,
    blueVal: 0,
    hexVal: "#000000",
    toSave: true,
    favVal: 0,
    idVal: -1
  }),
  methods: {
    clicked() {
      console.log('deleting: ')
      console.log(this.getCurrentColor());
      ColorService.deleteColor(this.getCurrentColor());
      this.$emit('cancelled', false);
    },
    toggle() {
      if (this.favVal == 0)
        this.favVal = 1;
      else if (this.favVal == 1)
        this.favVal = 0;
    },
    getCurrentColor() {
      var colorJSON = {
        color: {
          id: this.id,
          r: this.redVal,
          g: this.greenVal,
          b: this.blueVal,
          favorite: this.favVal,
          hex: this.hexVal
        }
      }
      return colorJSON;
    },
    save() {
      // update PUT call here
      ColorService.updateColor(this.getCurrentColor());
      this.$emit('cancelled', false);
    },
    test() {

    },
    deleteC() {
      ColorService.deleteColor(getCurrentColor());
      this.$emit('cancelled', false);
    },
    componentToHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    },
    convertRGBtoHex(r, g, b) {
      return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    },
    //hexToRGB
  },
  watch: {
    id: function(newValue, oldValue) {
      this.idVal = newValue;
    },
    favorite: function(newValue, oldValue) {
      this.favVal = newValue;
    },
    r: function(newValue, oldValue) {
      this.redVal = newValue;
      this.hexVal = this.convertRGBtoHex(this.redVal, this.greenVal, this.blueVal)
    },
    g: function(newValue, oldValue) {
      this.greenVal = newValue;
      this.hexVal = this.convertRGBtoHex(this.redVal, this.greenVal, this.blueVal)
    },
    b: function(newValue, oldValue) {
      this.blueVal = newValue;
      this.hexVal = this.convertRGBtoHex(this.redVal, this.greenVal, this.blueVal)
    },
    redVal: function(newValue, oldValue) {
      this.hexVal = this.convertRGBtoHex(this.redVal, this.greenVal, this.blueVal)
    },
    greenVal: function(newValue, oldValue) {
      this.hexVal = this.convertRGBtoHex(this.redVal, this.greenVal, this.blueVal)
    },
    blueVal: function(newValue, oldValue) {
      this.hexVal = this.convertRGBtoHex(this.redVal, this.greenVal, this.blueVal)
    },
    dialog: function(newValue, oldValue) {
      this.redVal = this.r;
      this.greenVal = this.g;
      this.blueVal = this.b;
    }
  },

}
</script>
