<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
      column
    >
        <v-flex align-center justify-center >
        <v-layout align-center justify-center row fill-height>
        <!-- <verte display='widget' value='#fef8e2' picker='wheel' model='hex' :rgbSliders="true" :recentColors='null' :dragable='true' :enableAlpha='false' v-model="cVal" @click='submit("nye")'></verte> -->
        <!-- <color-picker v-bind="color"  @input="onInput" style="position: relative; left: 41.8%;"></color-picker> -->
            <chrome :value="colors" @input="updateValue"></chrome>
        </v-layout>
        <v-flex>
    </v-flex> 
        </v-flex>

        <v-flex>
            <v-btn @click='save()' v-bind:style="{backgroundColor: cVal}">Save</v-btn>
            <v-btn @click='submit()' v-bind:style="{backgroundColor: cVal}">Submit</v-btn>
        </v-flex>
        <br>
        <v-flex v-if="advButton==false">
            <button @click='advToggle()'> Show Advanced Options </button>
        </v-flex>
        <v-flex v-else>
            <button @click='advToggle()'> Hide Advanced Options </button>
        </v-flex>
        <br>
        <v-flex v-if='advButton == true'>
            <button @click='rangeToggle()'>Toggle Brightness Style</button>
            <v-layout align-center justify-center row fill-height v-if="rangeButton == true">
                <!-- *** Text Field Label Code *** -->
                <!-- <v-flex shrink style="width: 7.5%;">   
                    <v-text-field
                        v-model="price[0]"
                        class="mt-0"
                        hide-details
                        single-line
                        type="number"
                        style="position: relative; left:170%;"
                    ></v-text-field>
                </v-flex> -->
    
                <v-flex>
                    <v-subheader style="width: 40%; position: relative; left: 11%">Brightness</v-subheader>
                    <v-range-slider
                        v-model="brightnessRange"
                        style="width: 70%; position: relative; left: 16.5%; top: -.7em;"
                        :thumb-label="true"
                        :color="colors.hex"
                        thumb-color="#14A6BD"
                        :thumb-size="32"
                        :max="255"
                        :min="0"
                        :step="1"
                    ></v-range-slider>
                </v-flex>

                <!-- *** Text Field Label Code *** -->
                <!-- <v-flex shrink style="width: 15%;">
                    <v-text-field
                        v-model="price[1]"
                        class="mt-0"
                        hide-details
                        single-line
                        type="number"
                        style="position: relative; right:75%;"
                    ></v-text-field>
                </v-flex> -->
            </v-layout >
            <v-layout align-center justify-center row fill-height v-else>
                <v-flex>
                    <v-slider 
                    style='position: relative; width: 85%; left:10%; top: -.2em;'
                    :thumb-label="true"
                    :track-color="colors.hex"
                    :color="colors.hex"
                    thumb-color="#14A6BD"
                    :thumb-size="32"
                    :max="255"
                    label="Brightness"
                    v-model="brightnessVal"
                     ></v-slider>
                </v-flex>
                <!-- <v-flex shrink style="width: 8.5%">   
                    <v-text-field
                        v-model="slider"
                        class="mt-0"
                        hide-details
                        single-line
                        style="width: 80%; position: relative; right: 200%; top: -1em"
                        type="number"
                    ></v-text-field>
                </v-flex> -->
            </v-layout>
            <v-layout align-center justify-center row fill-height>
                    <p style='top: 4px; position: relative;'>Empty Light Alternation</p>
                <v-flex xs12 sm4>
                    <v-overflow-btn
                        :items="dropdown_edit"
                        label="0-30 (default: 0)"
                        editable
                        style="marginLeft: 10px;"
                        small
                        item-value="text"
                    ></v-overflow-btn>
                </v-flex>
            </v-layout>

      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import ColorPicker from '@radial-color-picker/vue-color-picker';
import { Chrome } from 'vue-color'
import Api from '@/services/Api'
import ColorService from '@/services/ColorService'

export default {
  components: {
    ColorPicker,
    Chrome
  },
  data: () => ({
    cVal: '#111',//#fef8e2
    advButton: false,
    rangeButton: false,
    slider: 50,
    brightnessRange: [0, 255],
    dropdown_edit: [
      { text: '0' },
      { text: '1' },
      { text: '2' },
      { text: '3' },
      { text: '4' },
      { text: '8' },
      { text: '10' }
    ],
    color: {
        hue: 50,
        saturation: 100,
        luminosity: 25,
        alpha: 1
    },
    colors: {
        hex: '#194d33',
        hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
        hsv: { h: 150, s: 0.66, v: 0.30, a: 1 },
        rgba: { r: 25, g: 77, b: 51, a: 1 },
        a: 1
    },
    brightnessVal: 255
  }),
  watch: {
      cVal: function() {

      }
  },
  methods: {
      submit: function() { 
          console.log(this.colors); //debug
          ColorService.triggerColor(
              {
                  r:this.colors.rgba.r,
                  g:this.colors.rgba.g,
                  b:this.colors.rgba.b,
                  brightness:this.brightnessVal,
                  hex: this.convertRGBtoHex(this.colors.rgba.r,this.colors.rgba.g,this.colors.rgba.b)
              }
          ).then(function (response) {
            console.log(response);
          }).catch(e => {
            console.log(e);
          });

      },
      save() {
        ColorService.saveColor(
            {
              color:{
                r:this.colors.rgba.r,
                g:this.colors.rgba.g,
                b:this.colors.rgba.b,
                favorite:0,
                hex: this.convertRGBtoHex(this.colors.rgba.r,this.colors.rgba.g,this.colors.rgba.b)
              }

            }
          ).then(function (response) {
            console.log(response);
          }).catch(e => {
            console.log(e);
          });
      },
      change: function() {
        console.log(this.cVal)
      },
      rangeToggle: function() {
        this.rangeButton = !this.rangeButton;
      },
      advToggle: function() {
        this.advButton = !this.advButton;
      },
      onInput(hue) {
          this.color.hue = hue;
          this.cVal = hue;
      },
      updateValue: function(newValue) {
          this.red = newValue.rgba.r;
          this.colors = newValue;
      },
      componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
      },
      convertRGBtoHex(r, g, b) {
        return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
      },
  }
}
</script>


<style>
@import '~@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css';
</style>
