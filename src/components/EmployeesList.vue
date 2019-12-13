<template>

    <div class="wrapper">
        <div class="employees-list" v-if="employees.length > 0">
            <div class="employee" v-for="employee in employees">
                <h4 class="employee-name">{{ `${employee.first_name} ${employee.last_name}` }}</h4>
                <router-link :to="{ name: 'employee', params: { id: employee.emp_no } }"><img class="right-arrow-icon" src="../assets/right-arrow-icon.svg" alt=">"></router-link>
            </div>
        </div>
    </div>

</template>

<script>
    import EmployeesService from "../services/employees.service";

    export default {
        name: "EmployeesList",
        data() {
            return {
                employees: []
            }
        },
        mounted() {
            this.getEmployees();
        },
        methods: {
            async getEmployees() {
                this.employees = await EmployeesService.getEmployeesByDepartmentId(this.$router.currentRoute.params.id);
            }
        },
    }
</script>

<style scoped lang="scss">

    h3 {
        margin: 40px 0 0;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }

    .wrapper {
        width: 100%;
        height: auto;
    }

    .employees-list {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;
    }

    .employee {
        border-bottom: 1px solid #e3e3e3;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .employee-name {
        margin: 20px 0;
    }

    .right-arrow-icon {
        width: 25px;
        padding: 5px;
        border-radius: 50%;
        transition: 0.3s ease;

        &:hover {
            background-color: #f2f2f2;
        }
    }

    @media screen and (min-width: 768px){
        .employees-list {
            width: 70%;
            margin: 0 auto;
        }
    }

    @media screen and (min-width: 992px){
        .employees-list {
            width: 60%;
            margin: 0 auto;
        }
    }

</style>
