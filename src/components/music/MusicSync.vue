<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
      column
    >
    <v-flex x12 v-if="loggedIn == false">
      <v-btn href='http://localhost:8888/login'> Login to Spotify </v-btn>
    </v-flex>
    <v-flex v-if="loggedIn == true" column="">
      <v-flex v-if="nowPlaying.name != ''">
        <h1> {{nowPlaying.name}} </h1>
        <i style="font-size: 175%"> {{nowPlaying.artist}} </i>
        <v-flex>
          <img :src=nowPlaying.albumArt />
        </v-flex>
      </v-flex>
      <v-flex>
        <v-btn @click="getNowPlaying()">Check Currently Playing Song</v-btn>
      </v-flex>
    </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
import MusicService from '@/services/MusicService'
export default {
  components: {

  },
  data: () => ({
    params: '',
    loggedIn: false,
    nowPlaying: {
      name: '',
      artist: '',
      albumArt: '',
    },
  }),
  watch: {
  },
  methods: {
    // Parses the hash parameters
    getHashParams() {
      var hashParams = {};
      var e, r = /([^&;=]+)=?([^&;]*)/g,
          q = window.location.hash.substring(1);
      while ( e = r.exec(q)) {
          hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      return hashParams;
    },
    getNowPlaying() {
      MusicService.nowPlaying().then(response => {
        this.nowPlaying.name = response.data.item.name;
        this.nowPlaying.albumArt = response.data.item.album.images[1].url;
        this.nowPlaying.artist = response.data.item.artists[0].name;
        console.log(this.nowPlaying.albumArt);
      }).catch(e => {
        console.log(e);
      });
    }
  },
  mounted() {
    //console.log(this.$route.query);
    this.params = this.getHashParams();
    // determine if this mount was after the server api call
    if (this.params.access_token) {
      var access_token = this.params.access_token;
      var refresh_token = this.params.refresh_token;
      this.loggedIn = true;
      //spotifyApi.setAccessToken(this.access_token);
      //spotifyApi.setRefreshToken(this.refresh_token);
    } else {
      this.loggedIn = false;
    }
    this.$router.replace('/music/'); // clear out URL params
  }
}
</script>

<style>

</style>
