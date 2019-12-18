<template>
  <div class="home">
    <Departments />
  </div>
</template>

<script>
// @ is an alias to /src
import Departments from "../components/Departments";
import AuthService from "../services/auth.service";

export default {
  name: 'departments',
  components: {
    Departments
  },
  mounted() {

    if (!AuthService.getToken()) {
      if (!this.$route.query.jwt){
        this.$router.push({name: 'login'});
      }
    }

    if (this.$route.query.jwt && !AuthService.getToken()) {
      AuthService.setToken(this.$route.query.jwt);
    }

  }
}
</script>
