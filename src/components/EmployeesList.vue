<template>
    <div class="container">
        <h2 class="page-logo">Employee directory</h2>
        <div class="employees-list" v-if="employees.length > 0">
            <div class="employee" v-for="employee in employees">
                <router-link :to="{ name: 'employee', params: { eid: employee.emp_no} }">
                    <h4 class="employee-name">{{ `${employee.first_name} ${employee.last_name}` }}</h4>
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
    import SearchService from "../services/search.service";
    import ApiService from "../services/api.service";
    import PaginateService from "../services/paginate.service";
    import '../assets/styles/pagination.scss';

    export default {
        name: "EmployeesList",
        data() {
            return {
                employees: [],
                pageCount: 0
            }
        },
        mounted() {
            this.getPageCount();
            this.selectPageHandler(1);
        },
        methods: {
            getPageCount() {
                ApiService.getAllEmployeesCount().then(d => {
                    this.pageCount = Math.floor(d / PaginateService.pageSize);
                });
            },

            selectPageHandler(pageNumber) {
                PaginateService.getEmployeesForPage(pageNumber).then(e => {
                    this.employees = e;
                    this.setSearch();
                });
            },

            setSearch() {
                SearchService.clearSearchList();
                SearchService.setSearchList(this.employees.map(e => {
                    return {
                        id: e.emp_no,
                        search_item: `${e.first_name} ${e.last_name}`
                    }
                }), 'employee');
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
        height: 30px;
        margin-left: 10px;
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
            padding-left: 10px;

            &:hover {
                text-decoration: none;
                cursor: pointer;
                background-color: #fbfbfb;
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
