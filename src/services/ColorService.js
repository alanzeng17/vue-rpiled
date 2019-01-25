import Api from '@/services/Api'

export default {
  triggerColor (color) {
    return Api().post('/colors/setColor', color)
  },

  async retrieveColors() {
    let allColors = await Api().get('/colors');
    return allColors.data.colors; // contains a "colors" array with all of the color objects(id,r,g,b,fav)
  },

  async retrieveColors(fav) {
    let someColors;
    if (fav) {
      let params = {
        onlyFav: true
      }
      someColors = await Api().get('/colors', { params })
    } else {
      someColors = await Api().get('/colors');
    }
    return someColors.data.colors;
  },
  
  saveColor (color) {
    console.log(color);
    return Api().post('/colors/', color)
      .then(function (response) {
        console.log("asd");
        console.log(response);
      }).catch(e => {
        console.log("dsa");
        console.log(e);
      });
  },

  updateColor (color) {
    return Api().put('/colors/', color);
  },

  deleteColor (color) {
    return Api().delete('/colors/', color);
  }

}
