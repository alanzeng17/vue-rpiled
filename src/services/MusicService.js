import MusicApi from '@/services/MusicApi'

export default {
  test() {
    return MusicApi().get('/test')
    .then(function (response) {
      console.log(response);
    }).catch(e => {
      console.log(e);
    });
  },
  async nowPlaying() {
    var np = await MusicApi().get('/nowplaying')
    console.log(np);
    return np;
  }
}
