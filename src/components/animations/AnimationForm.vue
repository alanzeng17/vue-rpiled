<template>
  <v-card max-width="300">
    <v-card-title primary-title>
      <h3  v-text="title"></h3>
    </v-card-title>
    <v-divider/>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field
          required
          :rules="nameRules"
          label="Name"
          clearable
          v-model="name"
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
    <v-card-actions wrap>
      <v-btn v-if="this.animation" @click="del" color="red">
        Delete
      </v-btn>
      <v-btn v-else @click="cancel">
        Cancel
      </v-btn>
      <v-spacer/>
      <v-btn fab dark small @click="sendAnimation" color="primary">
        <v-icon>mdi-lightbulb-on</v-icon>
      </v-btn>
      <v-spacer/>
      <v-btn v-if="this.animation" @click="update" color="green">
        Update
      </v-btn>
      <v-btn v-else @click="save" color="green">
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
 
<script>
import AnimationFormStore from '../../stores/animationFormStore.js'
import AnimationService from '@/services/AnimationService'
import { convertTitle } from '@/components/animations/utils'

export default {
  name: 'AnimationForm',
  
  props: {
    dialog: {
      required: true,
      type: Boolean,
    },
    // name of the template
    template: {
      required: true,
      type: String
    },
    // title of the form
    title: {
      required: true,
      type: String
    },
    // animation (optional, used for displaying saved animations to edit)
    animation: {
      type: Object
    }
  },
  
  data () {
    return {
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
      ],
      favorite: false,
      valid: false,
    }
  },
  
  computed: {
    // useful for sending requests
    formData () {
      return {
        name: this.name,
        template: this.template,
        favorite: this.favorite,
      }
    },
  },
  
  watch: {
    dialog: function () {
      this.name = this.animation ? this.animation.name : '';
      this.favorite = this.animation ? this.animation.favorite : false;
      this.$refs.form.resetValidation()
    }
  },
  
  methods: {
    convertTitle,

    sendAnimation () {
      let body = AnimationFormStore.data;
      AnimationService.triggerAnimation(convertTitle(this.template), body)
    },
    // saves an animation to the database
    save () {
      // merge data from this form and the store
      if (this.$refs.form.validate()) {
        let merge = {...this.formData, ...AnimationFormStore.data};
        merge.template = convertTitle(merge.template);
        let payload = { animation: merge };
        // save animation
        AnimationService.saveAnimation(payload)
          .then((response) => {
            if (response.status == 200){
              console.log('Successfully saved animation.');
            } else {
              console.log(response);
            }
          })
        // tell the parent to get rid of the dialog
        this.$emit('cancelled', true);
      }
    },
    update () {
      if (this.$refs.form.validate()) {
        // merge data from this form and the store
        let merge = {...this.formData, ...AnimationFormStore.data};
        merge.template = this.animation.template;
        // add id field necessary for update
        merge.id = this.animation.id;
        // console.log(merge);
        let payload = { animation:merge }
        AnimationService.updateAnimation(payload)
          .then((response) => {
            if (response.status == 200){
              console.log('Successfully updated animation.');
            } else {
              console.log(response);
            }
          })
        this.$emit('cancelled', true);
        this.$emit('update', true);
      }
    },
    del () {
      let payload = { id:this.animation.id, template:this.animation.template }
      AnimationService.deleteAnimation(payload)
        .then((response) => {
          if (response.status == 200) {
            console.log('Successfully deleted animation.');
          } else {
            console.log(response);
          }
        })
      this.$emit('cancelled', true);
      this.$emit('update', true);
    },
    cancel () {
      this.$emit('cancelled', true);
    },
  }
}
</script>

<style>

</style>
