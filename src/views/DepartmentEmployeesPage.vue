<template>
    <EmployeesList/>
</template>

<script>
    import EmployeesList from "../components/EmployeesList";
    import AuthService from "../services/auth.service";

    export default {
        name: "DepartmentPage",
        components: {EmployeesList},
        mounted() {
            if (!AuthService.getToken()) {
                this.$router.push('login');
            }
        },
    }
</script>

<style scoped>

</style>
