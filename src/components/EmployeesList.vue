<template>

    <div class="container">
        <h2 class="page-logo">{{ department.dept_name }}</h2>
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
    import ApiService from "../services/api.service";

    export default {
        name: "EmployeesList",
        data() {
            return {
                employees: [],
                department: {},
            }
        },
        mounted() {
            this.getEmployees();
            this.getDepartment();
        },
        methods: {
            async getEmployees() {
                this.employees = await EmployeesService.getEmployeesByDepartmentId(this.$router.currentRoute.params.id);
            },
            async getDepartment() {
                this.department = await ApiService.getDepartmentById(this.$router.currentRoute.params.id);
            },
        },
    }
</script>

<style scoped lang="scss">

    .container {
        width: 100%;
        height: auto;
    }

    .page-logo {
        font-family: Merriweather, sans-serif;
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
        .container {
            width: 70%;
            margin: 0 auto;
        }
    }

    @media screen and (min-width: 992px){
        .container {
            width: 60%;
            margin: 0 auto;
        }
    }

</style>
