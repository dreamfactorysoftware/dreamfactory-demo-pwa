<template>

</template>

<script>
// @ is an alias to /src

import AuthService from "../services/auth.service";

export default {
  name: 'home',

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
