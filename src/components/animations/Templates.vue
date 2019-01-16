<template>
  <div>
    <v-dialog max-width="300" v-model="dialog">
      <AnimationForm @cancelled="dialog=false" :template="clickedTemplate">
        <component :is="formComponent"></component>
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
            <v-btn fab dark small color="primary" @click.stop.prevent="sendDefault(item.name)">
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
import AnimationAPI from '@/services/AnimationService'
import Api from '@/services/Api'
import AnimationForm from '@/components/animations/AnimationForm'
import FormMap from '@/components/animations/forms/FormMap'

export default {
  name: 'Templates',
  components: {
    AnimationForm,
  },
  data () {
    return {
      dialog: false,
      clickedTemplate: '',
      formComponent: FormMap.forms['rainbowGradient'],
      templates: [],
    }
  },
  
  methods: {
    async sendDefault(title) {
      // determine name of endpoint to hit
      title = this.convertTitle(title);
      // send the request
      let response = await Api().post('/animations/' + title)
      if (response.status == 200) {
        console.log(`Success! You sent a req for ${title}`);
      } else {
        console.log('Failure!');
      }
    },

    async loadTemplates() {
      let temp = await Api().get('/animations/templates');
      console.log(temp);
      this.templates = temp.data.templates;
    },

    handleClick(item) {
      if (item.name !== 'strandTest'){
        this.dialog = true;
        this.clickedTemplate = this.toDisplay(item.name);
        this.formComponent = FormMap.forms[item.name]; 
      }
    },

    convertTitle(title) {
      let s = title.split(' ');
      s[0] = s[0].toLowerCase();
      return s.join('');
    },

    toDisplay(name) {
      let result = name.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); });
      return result;
    }

  },
  
  async mounted () {
    await this.loadTemplates();
  },
}
</script>

<style>

</style>
