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
}
#app {
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #3f3f3f;
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
  export default {
    components: {
      Navbar
    }
  }
</script>
