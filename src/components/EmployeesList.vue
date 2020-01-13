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
              <md-icon>account_circle</md-icon>
              {{ `${employee.first_name} ${employee.last_name}` }}
            </h4>
            <p class="employee-email">
              <md-icon>mail_outline</md-icon>
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
        v-model="currentPage"
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
    import {mapGetters} from "vuex";

    export default {
        name: "EmployeesList",
        data() {
            return {
                employees: [],
                pageCount: 0,
                currentPage: 1,
            }
        },
        computed: {
            ...mapGetters([
            'getEmployees',
            'getSearch'
            ])
        },
        watch: {
          getSearch() {
            if (!this.getSearch.empty) {
              this.pageCount = this.getSearch.count;
              this.currentPage = parseInt(this.$route.query.page);
              this.employees = this.getSearch.searchResult;
            } else {
              this.getPageCount();
              this.currentPage = PaginateService.validatePageNumber(this.$route, parseInt(this.$route.query.page), this.pageCount);
              this.employees = this.getEmployees;
            }
          }
        },
        mounted() {
            this.getPageCount();
            this.selectPageHandler(this.$route.query.page);
            this.$store.commit('setHeader', 'Employees');
        },
        beforeDestroy() {
            SearchService.clearSearch();
        },
        methods: {
            getPageCount() {
                ApiService.getAllEmployeesCount().then(d => {
                    this.pageCount = Math.floor(d / PaginateService.getPageSize());
                });
            },

            selectPageHandler(pageNumber) {
              pageNumber = PaginateService.validatePageNumber(this.$route , pageNumber);

              ApiService.getEmployeesWithPagination(PaginateService.getPageSize(), PaginateService.getOffset(pageNumber))
                    .then(employees => {
                        this.$store.commit('setEmployees', employees);

                        if (this.getSearch.searchResult.length > 0) {
                          this.employees = this.getSearch.searchResult;
                        } else {
                          this.employees = employees;
                        }
                    });

              this.currentPage = parseInt(PaginateService.getCurrentPage());
            }
        }
    }
</script>

<style scoped lang="scss">
    h2 {
        font-size: $block-header-size;
        font-weight: 700;
    }

    h4 {
      font-family: Raleway, sans-serif;
        font-size: $list-header-size;
        font-weight: 600;
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
        margin: 20px 0 10px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: $dark-blue;

        & > i {
          margin-right: 8px;
          color: $light-blue!important;
        }
    }

    .employee-email {
        display: flex;
        align-items: center;
        justify-content: center;
        color: $dark-blue;
        margin-bottom: 12px;

        & > i {
          margin-right: 8px;
          color: $light-blue!important;
        }
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
