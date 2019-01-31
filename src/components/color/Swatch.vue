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
              <v-card slot="activator" height="100px" flat tile :color="String(colors[n-1])" @click="dialog = true; clickedColor=String(colors[n-1])">
              </v-card>
            </v-flex>
            <v-dialog v-model="dialog" max-width="600px">
              <v-flex>
                <color-form :hex="clickedColor"></color-form>
                <v-layout row justify-center>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" flat large @click="dialog = false">Close</v-btn>
                  <v-btn color="blue darken-1" flat large @click="dialog = false">Save</v-btn>
                </v-card-actions>
                </v-layout>
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
      colorIdMap: new Map(),
      clickedColor: '#ffffff'
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
    submit: function(index) {
      alert('clicked color: ' + this.colors[index])
    },
    componentToHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    },
    convertRGBtoHex(r, g, b) {
      return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }
  },
  async mounted() {
    // Get relevant colors from backend
    console.log(this.favorites);
    await ColorService.retrieveColors(this.favorites)
    .then(response => {
      this.colors = response;
    }).catch(e => {
      console.log(e);
    });
  
    // Convert data into easily used array
    var newColors = [];
    this.colorIdMap = new Map();
    for (var i = 0; i < this.colors.length; i++) {
      var r = this.colors[i].r;
      var g = this.colors[i].g;
      var b = this.colors[i].b;
      var id = this.colors[i].id;
      var hex = this.convertRGBtoHex(r, g, b);
      if (!this.colorIdMap.has(hex)){
        this.colorIdMap.set(hex, id); // map hex to id for future database calls
        newColors.push(hex);
      }

    }
    this.colors = newColors;
    this.asdf = this.colors[0]
    console.log(this.colors);
    console.log(typeof this.colors[0])
  }
}
</script>

<style>

</style>
