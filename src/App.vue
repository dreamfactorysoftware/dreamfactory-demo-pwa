<template>
  <div id="app">
    <Navbar v-if="$router.currentRoute.path !== '/login'" />
    <div
      class="wrapper"
      :class="{'no-margin': $router.currentRoute.name === 'map'}"
    >
      <router-view v-show="!getLoading"/>
      <clip-loader :loading="getLoading" class="loader" :color="color" :size="'70px'" />
    </div>
    <BottomBar
      v-if="windowWidth <= 768 && $router.currentRoute.path !== '/login'"
      class="bottom-bar"
    />
  </div>
</template>

<script>
  import Navbar from "./components/Navbar";
  import AuthService from "./services/auth.service";
  import BottomBar from "./components/BottomBar";
  import {mapGetters} from "vuex";
  import { pwa } from '../vue.config'

  export default {
    components: {
      BottomBar,
      Navbar
    },

    data() {
      return {
        color: pwa.themeColor,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
      }
    },

    computed: {
      ...mapGetters([
        'getLoading'
      ])
    },

    watch: {
      $route() {
        this.isAuthenticated();
      }
    },

    beforeMount() {
      this.isAuthenticated();
    },

    created() {
      window.addEventListener('resize', this.handleResize);
      this.handleResize();
    },

    destroyed() {
      window.removeEventListener('resize', this.handleResize);
    },

    methods: {
      isAuthenticated() {
        let isEmptyJWT = typeof this.$route.query.jwt === 'undefined' || !this.$route.query.jwt;
        if (this.$router.currentRoute.name !== 'login' && !AuthService.getToken() && isEmptyJWT) {
          this.$router.push({name: 'login'});
        }
        else if (this.$route.query.jwt) {
          AuthService.setToken(this.$route.query.jwt);
        }
      },

      handleResize() {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
      }
    }
  }
</script>

<style lang="scss">

  html {
    background-color: $white !important;
  }

  body {
    margin: 0;
    background-color: $white !important;
  }

  #app {
    font-family: 'Lato', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: $darkest-blue;
  }

  .wrapper {
    width: auto;
    height: auto;
    margin: 10px 10px 70px 10px;
    z-index: 1;
  }

  .no-margin {
    margin: 0;
  }

  .loader {
    padding-top: 20px;
  }

  .bottom-bar {
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 100;
  }

  @media screen and (min-width: 769px){
    .wrapper {
      margin: 0;
    }
  }

</style>
