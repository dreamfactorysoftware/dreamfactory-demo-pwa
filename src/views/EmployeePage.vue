<template>
    <div class="wrapper">
        <div class="container">
            <div class="employee-information" v-if="employee.emp_no">
                <h3>{{ `${employee.first_name} ${employee.last_name}` }}</h3>
                <p>Birth date: <b>{{ employee.birth_date }}</b></p>
                <p>Gender: {{ getGender() }}</p>
                <p>Hire date: {{ employee.hire_date }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import ApiService from "../services/api.service";
    import AuthService from "../services/auth.service";

    export default {
        name: "EmployeePage",
        data() {
            return {
                employee: {}
            }
        },
        mounted() {
            this.getEmployeeById(this.$router.currentRoute.params.eid);

            if (!AuthService.getToken()) {
                this.$router.push({name: 'login'});
            }
        },
        methods: {
            async getEmployeeById(id) {
                this.employee = await ApiService.getEmployeeById(id);
            },
            getGender() {
                if(this.employee.gender === 'M') {
                    return 'Male';
                }
                else if (this.employee.gender === 'F') {
                    return 'Female';
                }
                else {
                    return '';
                }
            }
        }
    }
</script>

<style scoped>

</style>
