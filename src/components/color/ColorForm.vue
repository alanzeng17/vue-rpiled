<template>
  <v-layout row justify-center>
      <v-card>
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
          <v-spacer></v-spacer>
          <v-btn color="error" @click="clicked()">Delete</v-btn>
          <v-btn color="blue-grey" >Test</v-btn>
          <v-btn color="success" @click="save()">Save</v-btn>
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
    id: -1,
    favorite: 0,
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
    },
    toggle() {
      if (this.favorite == 0)
        this.favorite = 1;
      else if (this.favorite == 1)
        this.favorite = 0;
    },
    save() {
      // update PUT call here
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
    r: function(newValue, oldValue) {
      this.redVal = newValue;
      this.hexVal = this.convertRGBtoHex(this.redVal, this.blueVal, this.greenVal)
    },
    g: function(newValue, oldValue) {
      this.greenVal = newValue;
      this.hexVal = this.convertRGBtoHex(this.redVal, this.blueVal, this.greenVal)
    },
    b: function(newValue, oldValue) {
      this.blueVal = newValue;
      this.hexVal = this.convertRGBtoHex(this.redVal, this.blueVal, this.greenVal)
    },
    redVal: function(newValue, oldValue) {
      this.hexVal = this.convertRGBtoHex(this.redVal, this.blueVal, this.greenVal)
    },
    greenVal: function(newValue, oldValue) {
      this.hexVal = this.convertRGBtoHex(this.redVal, this.blueVal, this.greenVal)
    },
    blueVal: function(newValue, oldValue) {
      this.hexVal = this.convertRGBtoHex(this.redVal, this.blueVal, this.greenVal)
    },
    dialog: function(newValue, oldValue) {
      if (this.toSave == false) {
        this.redVal = this.r;
        this.greenVal = this.g;
        this.blueVal = this.b;
      } else {
        this.toSave = false;
      }
    }
  },

}
</script>
