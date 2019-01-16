<template>
  <v-card max-width="300">
    <v-card-title primary-title>
      <h3>Customize Animation</h3>
    </v-card-title>
    <v-divider/>
    <v-card-text>
      <v-form ref="form" lazy-validation>
        <v-text-field
          required
          label="Name"
          clearable
          v-model="formData.name"
        ></v-text-field>
        <v-text-field
          required
          label="Template"
          disabled
          :placeholder="template"
        ></v-text-field>
        <slot/>      
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="cancel">
        Cancel
      </v-btn>
      <v-spacer/>
      <v-btn fab dark small color="primary">
        <v-icon>mdi-lightbulb-on</v-icon>
      </v-btn>
      <v-spacer/>
      <v-btn @click="save" color="green">
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
 
<script>
import AnimationFormStore from '../../stores/animationFormStore.js'

export default {
  name: 'AnimationForm',
  props: {
    template: {
      required: true,
      type: String
    },
  },
  data () {
    return {
    
    }
  },
  computed: {
    formData() {
      return {
        name: '',
        template: this.template,
        favorite: false,
      }
    }
  },
  methods: {
    save () {
      let merge = {...this.formData, ...AnimationFormStore.data};
      console.log(merge);
    },
    cancel () {
      this.$emit('cancelled', true);
    }
  }
}
</script>

<style>

</style>
