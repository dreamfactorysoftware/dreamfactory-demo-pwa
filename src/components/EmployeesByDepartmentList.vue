<template>

    <div class="container">
        <h2 class="page-logo">Employees from {{ department.dept_name }}</h2>
        <div class="employees-list" v-if="pageEmployees.length > 0 && department.dept_name">
            <div class="employee" v-for="employee in pageEmployees">
                <router-link :to="{ name: 'deptEmployee', params: { id: department.dept_no, eid: employee.emp_no } }">
                    <div class="user-info">
                        <h4 class="employee-name">{{ `${employee.first_name} ${employee.last_name}` }}</h4>
                        <p class="employee-email">email@email.com</p>
                    </div>
                    <img class="right-arrow-icon" src="../assets/right-arrow-icon.svg" alt=">">
                </router-link>
            </div>
        </div>
        <div class="pagination-container" v-if="pageCount !== 0">
            <paginate
                    :page-count="pageCount"
                    :click-handler="selectPageHandler"
                    :prev-text="'Prev'"
                    :next-text="'Next'"
                    :container-class="'pagination'">
            </paginate>
        </div>
    </div>

</template>

<script>
    import ApiService from "../services/api.service";
    import SearchService from "../services/search.service";
    import PaginateService from "../services/paginate.service";

    export default {
        name: "EmployeesByDepartmentList",
        data() {
            return {
                allDeptEmployees: [],
                department: {},
                pageEmployees: [],
                pageCount: 0
            }
        },
        mounted() {
            this.getDeptEmployees();
        },
        methods: {
            getDeptEmployees() {
                ApiService.getEmployeesByDeptId(this.$router.currentRoute.params.id).then(dept => {
                    this.department = dept;
                    this.allDeptEmployees = dept.employees_by_dept_emp;
                    this.pageCount = Math.floor(this.allDeptEmployees.length / PaginateService.pageSize);
                    this.selectPageHandler(1);
                });
            },

            selectPageHandler(pageNumber) {
                this.pageEmployees = PaginateService.getDeptEmployeesForPage(this.allDeptEmployees, pageNumber);
                this.setSearch();
            },

            setSearch() {
                SearchService.clearSearchList();
                SearchService.setSearchList(this.pageEmployees.map(e => {
                    return {
                        id: e.emp_no,
                        search_item: `${e.first_name} ${e.last_name}`
                    }
                }), 'employee');
            }
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
        padding-left: 10px;
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
            padding: 0 10px;

            &:hover {
                text-decoration: none;
                cursor: pointer;
                background-color: #fbfbfb;
            }
        }
    }

    .user-info {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
    }

    .employee-name {
        margin: 20px 0 5px 0;
        color: #3f3f3f;
    }

    .employee-email {
        color: #949494;
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
