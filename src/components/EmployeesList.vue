<template>
  <div class="container">
    <h2 class="page-logo">
      Employee directory
    </h2>
    <div
      v-if="employees.length > 0"
      class="employees-list"
    >
      <div
        v-for="employee in employees"
        class="employee"
      >
        <router-link :to="{ name: 'employee', params: { eid: employee.emp_no} }">
          <div class="user-info">
            <h4 class="employee-name">
              {{ `${employee.first_name} ${employee.last_name}` }}
            </h4>
            <p class="employee-email">
              {{ employee.email }}
            </p>
          </div>
          <img
            class="right-arrow-icon"
            src="../assets/right-arrow-icon.svg"
            alt=">"
          >
        </router-link>
      </div>
    </div>
    <div
      v-if="pageCount !== 0"
      class="pagination-container"
    >
      <paginate
        :page-count="pageCount"
        :click-handler="selectPageHandler"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
      />
    </div>
  </div>
</template>

<script>
    import SearchService from "../services/search.service";
    import ApiService from "../services/api.service";
    import PaginateService from "../services/paginate.service";

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
            this.$store.commit('setHeader', 'Employees');
        },
        beforeDestroy() {
            SearchService.clearSearchList();
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
        }
    }
</script>

<style scoped lang="scss">
    h2 {
        font-size: $block-header-size;
    }

    h4 {
        font-size: $list-header-size;
    }

    .container {
        width: 100%;
        height: auto;
        margin-top: 20px;
    }

    .page-logo {
        display: none;
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
        border-bottom: 1px solid $light-gray;

        &>a {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 10px;

            &:hover {
                text-decoration: none;
                cursor: pointer;
                background-color: $hover-white;
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
        color: $darkest-blue;
    }

    .employee-email {
        color: $dark-blue;
    }

    .right-arrow-icon {
        width: 25px;
        padding: 5px;
        border-radius: 50%;
        transition: 0.3s ease;

        &:hover {
            background-color: $light-gray;
        }
    }

    @media screen and (min-width: 768px){
        .container {
            width: 70%;
            margin: 40px auto 0;
        }
        .page-logo {
            display: block;
        }
    }

    @media screen and (min-width: 992px){
        .container {
            width: 60%;
            margin: 40px auto 0;
        }
    }
</style>
