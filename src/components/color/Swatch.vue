<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <h1 v-if="favorites==true">Favorites</h1>
      <h1 v-else>Saved</h1>
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
        <v-container v-bind="{ [`grid-list-${size}`]: true }" fluid>
          <v-layout row wrap>
            <v-flex
              v-for="n in colors.length"
              :key="n"
              xs4
            >
              <v-card slot="activator" height="7em" width="7em" flat tile :color="String(colors[n-1])" @click="submit(n-1)">
              </v-card>
            </v-flex>
            <v-dialog v-model="dialog">
              <v-flex>
                <color-form @cancelled="dialog=false" v-bind="currentProps()">
                </color-form>
              </v-flex>
            </v-dialog>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
/* Notes:
  Dynamically pull from SQLITE3 database
  On load, use setup to query database and generate dynamic fav colors
  Use a grid layout to show colors, sort by hex value
  clicking square brings up a card allowing you to submit/edit/delete
  - each color has parameters: Type of Brightness, Brightness, Alternation(TODO)
  v-bind/v-model each card to the respective object in the array
*/
// TODO:
// colors has been loaded, now work on dynamically rendering it
// Add save functionality on picker page
// Add form update
// Edit button to delete
import ColorService from '@/services/ColorService'
import ColorForm from '@/components/color/ColorForm'

export default {
  name: 'Swatch',
  props: {
    favorites: {
      required: true,
      type: Boolean,
    },
  },
  components: {
    ColorForm
  },
  data: () => ({
      size: 'sm',
      colors: ['#12345f'],
      dialog: false,
      colorMap: new Map(),
      clickedColor: '#ffffff',
      clickedIndex: 0,
      n: 0,
  }),
  methods: {
     getRandomColor: function() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    submit: function(color) {
      this.dialog = true;
      this.clickedIndex = color;
    },
    componentToHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    },
    convertRGBtoHex(r, g, b) {
      return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    },
    convertHexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
    },
    // Sets the props based on the most recently clicked index
    currentProps: function() {
      if (this.colorMap.has(String(this.colors[this.clickedIndex]))){
        var hexKey = String(this.colors[this.clickedIndex]);
        var rgb = this.convertHexToRgb(hexKey);
        return {
          dialog: true,
          hex: hexKey,
          id: this.colorMap.get(hexKey)[0],
          favorite: this.colorMap.get(hexKey)[1],
          r: rgb.r,
          g: rgb.g,
          b: rgb.b

        }
      } else {
        return {
          dialog: true,
          hex: "#000000",
          id: -1,
          favorite: 0,
          r: 0,
          g: 0,
          b: 0
        }
      }
    },
    async runStartup() {
      // Get relevant colors from backend
      await ColorService.retrieveColors(this.favorites)
      .then(response => {
        this.colors = response;
        //console.log(response);
      }).catch(e => {
        console.log(e);
      });

      // Convert data into easily used array
      var newColors = [];
      this.colorMap = new Map();
      for (var i = 0; i < this.colors.length; i++) {
        var r = this.colors[i].r;
        var g = this.colors[i].g;
        var b = this.colors[i].b;
        var id = this.colors[i].id;
        var fav = this.colors[i].favorite ? 1 : 0;
        var hex = this.convertRGBtoHex(r, g, b);
        if (!this.colorMap.has(hex)){
          var tup = [id, fav]
          this.colorMap.set(hex, tup); // map hex to id for future database calls
          newColors.push(hex);
        }
      }
      this.colors = newColors;
    }
  },
  async mounted() {
    this.runStartup();
  },
  watch: {
    dialog: function(newValue, oldValue) {
      if (newValue == false) {
        this.runStartup();
      }
    }
  }
}
</script>

<style>

</style>
