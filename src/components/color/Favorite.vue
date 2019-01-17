<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <h1>Favorites</h1>
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
        <v-container v-bind="{ [`grid-list-${size}`]: true }" fluid>
          <v-layout row wrap>
            <v-flex
              v-for="n in 9"
              :key="n"
              xs4
            >
              <v-card height="100px" flat tile :color='getRandomColor()'>
                <v-card-title
                >{{color}}</v-card-title>
              </v-card>
            </v-flex>
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
export default {
  components: {

  },
  data: () => ({
      size: 'sm',
      items: [
        { text: 'Extra small (2px)', value: 'xs' },
        { text: 'Small (4px)', value: 'sm' },
        { text: 'Medium (8px)', value: 'md' },
        { text: 'Large (16px)', value: 'lg' },
        { text: 'Extra large (24px)', value: 'xl' }
      ],
      testHex: '#ffffff'
  }),
  created: function() {
    // run setup on page creation
    this.setup();
  },
  methods: {
    setup: function() {
      alert("Load Database Favorites here!")
      // Make REST call to Database, return an array of Color Objects
      // Use v-loop or v-key or whatever to dynamically render all colors
    },
     getRandomColor: function() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  }
}
</script>

<style>

</style>
