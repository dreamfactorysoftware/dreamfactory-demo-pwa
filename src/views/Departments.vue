<template>
    <DepartmentsList />
</template>

<script>
    import DepartmentsList from "../components/DepartmentsList";
    import AuthService from "../services/auth.service";
    export default {
        name: "Departments",
        components: {
            DepartmentsList
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

<style scoped>

</style>
