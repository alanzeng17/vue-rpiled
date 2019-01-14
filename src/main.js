import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Verte from 'verte';
import './styles/verte.css';
import '@mdi/font/css/materialdesignicons.css'
Vue.config.productionTip = false

// register component globally
Vue.component('verte', Verte);

Vue.use(vuetify)
new Vue({
  render: h => h(App),
  router,
  components: {
    Verte,
  }
}).$mount('#app')
