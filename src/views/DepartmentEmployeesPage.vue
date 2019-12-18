<template>
    <EmployeesByDepartmentList/>
</template>

<script>
    import AuthService from "../services/auth.service";
    import EmployeesByDepartmentList from "../components/EmployeesByDepartmentList";

    export default {
        name: "DepartmentPage",
        components: {EmployeesByDepartmentList},
        mounted() {
            if (!AuthService.getToken()) {
                this.$router.push({name: 'login'});
            }
        },
    }
</script>

<style scoped>

</style>
