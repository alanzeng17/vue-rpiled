<template>
  <v-layout row justify-center>
      <v-card>
          <v-flex v-if="favorite == 0">
            <v-btn flat icon color="grey">
              <v-icon>favorite</v-icon>
            </v-btn>
          </v-flex>
          <v-flex v-else>
            <v-btn flat icon color="red">
              <v-icon>favorite</v-icon>
            </v-btn>
          </v-flex>
        <v-card-text>
          <v-container grid-list-md>
            <h1>{{id}}</h1>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Legal first name*" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password*" type="password" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age*"
                  required
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
      </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="clicked()">Close</v-btn>
          <v-btn flat @click="clicked()">Save</v-btn>
        </v-card-actions>
      </v-card>
  </v-layout>
</template>

<script>
import ColorService from '@/services/ColorService'

export default {
  name: 'Swatch',
  props: {
    hex: {
      required: false,
      type: String,
    },
    id: {
      required: false,
      type: Number
    },
    favorite: {
      required: false,
      type: Number
    }
  },
  components: {
    id: -1,
    favorite: 0,
  },
  data: () => ({

  }),
  methods: {
    clicked() {
    }
  },
  mounted() {
    
  }
}
</script>
