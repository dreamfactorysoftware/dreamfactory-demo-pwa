<template>

    <div class="container">
        <h2 class="page-logo">Employees from {{ departmentName }}</h2>
        <div class="employees-list" v-if="employees.length > 0 && department.dept_name">
            <div class="employee" v-for="employee in employees">
                <router-link :to="{ name: 'deptEmployee', params: { id: department.dept_no, eid: employee.emp_no } }">
                    <h4 class="employee-name">{{ `${employee.first_name} ${employee.last_name}` }}</h4>
                    <img class="right-arrow-icon" src="../assets/right-arrow-icon.svg" alt=">">
                </router-link>
            </div>
        </div>
    </div>

</template>

<script>
    import EmployeesService from "../services/employees.service";
    import ApiService from "../services/api.service";
    import SearchService from "../services/search.service";

    export default {
        name: "EmployeesByDepartmentList",
        data() {
            return {
                employees: [],
                departmentName: '',
                department: {}
            }
        },
        mounted() {
            this.getEmployees();
            this.getDepartment();
        },
        methods: {
            async getEmployees() {
                this.employees = await EmployeesService.getEmployeesByDepartmentId(this.$router.currentRoute.params.id);
                SearchService.clearSearchList();
                SearchService.setSearchList(this.employees.map(e => {
                    return {
                        id: e.emp_no,
                        search_item: `${e.first_name} ${e.last_name}`
                    }
                }), 'employee');
            },
            async getDepartment() {
                this.department = await ApiService.getDepartmentById(this.$router.currentRoute.params.id);
                this.departmentName = this.department.dept_name;
            },
        },
        beforeDestroy() {
            SearchService.clearSearchList();
        }
    }
</script>

<style scoped lang="scss">

    h2 {
        font-size: 1.6rem;
    }

    h4 {
        font-size: 1.1rem;
    }

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

        &>a {
            display: flex;
            justify-content: space-between;
            align-items: center;

            &:hover {
                text-decoration: none;
                cursor: pointer;
            }
        }
    }

    .employee-name {
        margin: 20px 0;
        color: #3f3f3f;
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
