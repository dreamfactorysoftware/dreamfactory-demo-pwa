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
        }
    }
</script>

<style scoped>

</style>
