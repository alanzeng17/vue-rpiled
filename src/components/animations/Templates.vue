<template>
  <div>
    <v-dialog max-width="300" v-model="dialog">
      <AnimationForm 
        @cancelled="dialog=false" 
        :template="clickedTemplate"
        :title="'Customize Animation'"
        :dialog="dialog"
      >
        <component :is="formComponent" :dialog="dialog" :template="formTemplate"></component>
      </AnimationForm>
    </v-dialog>
    <h3>Templates</h3>
    <v-list two-line subheader>
      <template v-for="item in templates">
        <v-list-tile
          :key="toDisplay(item.name)"
          avatar
          @click="handleClick(item)"
        >
          <v-list-tile-avatar>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ toDisplay(item.name) }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn fab dark small color="primary" @click.stop="sendDefault(item.name)">
              <v-icon>mdi-lightbulb-on</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider/>
      </template>
    </v-list>
  </div>
</template>

<script>
import AnimationService from '@/services/AnimationService'
import AnimationForm from '@/components/animations/AnimationForm'
import AnimationFormStore from '@/stores/animationFormStore'
import FormMap from '@/components/animations/forms/FormMap'
import { convertTitle, toDisplay } from '@/components/animations/utils'

export default {
  name: 'Templates',
  components: {
    AnimationForm,
  },
  data () {
    return {
      dialog: false,
      clickedTemplate: '',
      formTemplate: '',
      formComponent: null,
      templates: [],
    }
  },
  watch: {
    dialog (val) {
      if (val === false) {
        AnimationFormStore.clear();
      }
    }
  },
  methods: {
    convertTitle,
    toDisplay,
    
    async sendDefault(title) {
      // determine name of endpoint to hit
      title = this.convertTitle(title);
      // send the request
      AnimationService.triggerAnimation(title, {})
        .then((response) => {
          if (response.status == 200) {
            console.log(`Success! You sent a req for ${title}`);
          } else {
            console.log('Failure!');
          }
        });
    },

    async loadTemplates() {
      this.templates = await AnimationService.retrieveTemplates();
    },

    handleClick(item) {
      if (item.name !== 'strandTest'){
        this.dialog = true;
        this.clickedTemplate = this.toDisplay(item.name);
        this.formTemplate = item.name;
        this.formComponent = FormMap.forms[item.name]; 
      }
    },
  },
  
  async mounted () {
    await this.loadTemplates();
  },
}
</script>

<style>

</style>
