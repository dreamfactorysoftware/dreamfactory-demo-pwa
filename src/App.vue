<template>
  <div id="app">
    <Navbar v-if="$router.currentRoute.path !== '/login'"/>
    <div class="wrapper">
      <router-view/>
    </div>

  </div>
</template>

<style lang="scss">

  body {
    margin: 0;
    background-color: $ghost-white !important;
  }
  #app {
    font-family: 'Lato', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: $dark-blue;
  }
  .wrapper {
    width: auto;
    height: auto;
    margin: 15px;
    z-index: 1;
  }
  @media screen and (min-width: 500px){
    .wrapper {
      margin: 8px 15px;
    }
  }
</style>
<script>
  import Navbar from "./components/Navbar";
  import AuthService from "./services/auth.service";
  export default {
    components: {
      Navbar
    },

    watch: {
      $route() {
        this.isAuthenticated();
      }
    },

    mounted() {
      this.isAuthenticated();
    },

    methods: {
      isAuthenticated() {
        let isEmptyJWT = typeof this.$route.query.jwt === 'undefined' || !this.$route.query.jwt;
        if (this.$router.currentRoute.name !== 'login' && !AuthService.getToken() && isEmptyJWT) {
          this.$router.push({name: 'login'});
        }
        else if (this.$route.query.jwt){
          AuthService.setToken(this.$route.query.jwt);
        }
      }

    }
  }
</script>
