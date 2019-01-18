import Api from '@/services/Api'

export default {
  triggerAnimation (name, payload) {
    return Api().post(`/animations/${name}`, payload)
  },

  async retrieveTemplates () {
    let templates = await Api().get('/animations/templates');
    return templates.data.templates;
  },

  async retrieveTemplate (template) {
    let templates = await Api().get('/animations/templates', { params: { name: template } })
    return templates.data.template;
  },
  
  async retrieveAnimations (favs) {
    let animations;
    if (favs) {
      let params = {
        onlyFav: true
      }
      animations = await Api().get('/animations/', params);
    } else {
      animations = await Api().get('/animations/');
    }
    return animations.data.animations;
  },
  
  saveAnimation (payload) {
    return Api().post('/animations/', payload);
  },
  
  updateAnimation (payload) {
    return Api().put('/animations/', payload);
  },

  deleteAnimation (payload) {
    let config = { data: payload }
    return Api().delete('/animations/', config);
  }
}
