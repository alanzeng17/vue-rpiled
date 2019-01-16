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
        <chrome v-model="colors" style=""></chrome>
        </v-layout>
        <br></br>
      </v-flex>
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
                <v-flex shrink style="width: 6.5%;">   
                    <v-text-field
                        v-model="price[0]"
                        class="mt-0"
                        hide-details
                        single-line
                        type="number"
                        style="position: relative; left:350%;"
                    ></v-text-field>
                </v-flex>
    
                <v-flex>
                    <v-range-slider
                        v-model="price"
                        style="width: 43%; position: relative; left: 28.5%; top: .7em;"
                        label="Brightness"
                        :max="100"
                        :min="0"
                        :step="1"
                    ></v-range-slider>
                </v-flex>
    
                <v-flex
                shrink
                style="width: 9%;"
                >
                    <v-text-field
                        v-model="price[1]"
                        class="mt-0"
                        hide-details
                        single-line
                        type="number"
                        style="position: relative; right:225%;"
                    ></v-text-field>
                </v-flex>

            </v-layout >
            <v-layout align-center justify-center row fill-height v-else>
                <v-flex>
                    <v-slider 
                    v-model="slider"
                    style='position: relative; width: 38%; left:35%; top: -.2em;'
                    label='Brightness'
                     ></v-slider>
                </v-flex>
                <v-flex shrink style="width: 6.5%">   
                    <v-text-field
                        v-model="slider"
                        class="mt-0"
                        hide-details
                        single-line
                        style="width: 75%; position: relative; right: 350%; top: -1em"
                        type="number"
                    ></v-text-field>
                </v-flex>
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
    <br>
    <v-flex>
        <v-btn @click='submit("call REST API here")' v-bind:style="{backgroundColor: cVal}">Submit</v-btn>
    </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ColorPicker from '@radial-color-picker/vue-color-picker';
import { Chrome } from 'vue-color'

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
        price: [0, 100],
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
        }
    }),
    watch: {
        cVal: function() {

        }
    },
    methods: {
        submit: function(message) {
            alert(message)
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
    }
}
</script>


<style>
@import '~@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css';
</style>
