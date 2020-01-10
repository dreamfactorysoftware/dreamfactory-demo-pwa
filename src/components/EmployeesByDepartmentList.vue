<template>
  <div class="container">
    <h2 class="page-logo">
      Employees from {{ department.dept_name }}
    </h2>
    <div class="top-link">
      <router-link :to="{name: 'departments'}">
        <img
          src="../assets/right-arrow-icon.svg"
          class="top-link-right-arrow-icon"
          alt="back"
        >Go to departments directory
      </router-link>
    </div>
    <div
      v-if="pageEmployees.length > 0 && department.dept_name"
      class="employees-list"
    >
      <div
        v-for="employee in pageEmployees"
        class="employee"
      >
        <router-link :to="{ name: 'deptEmployee', params: { id: department.dept_no, eid: employee.emp_no } }">
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
                pageCount: 0,
                currentPage: 1,
            }
        },
        mounted() {
            this.getDeptEmployees();
        },
        beforeDestroy() {
            SearchService.clearSearchList();
        },
        methods: {
            getDeptEmployees() {
                ApiService.getEmployeesByDeptId(this.$router.currentRoute.params.id).then(dept => {
                    this.department = dept;
                    this.allDeptEmployees = dept.employees_by_dept_emp;
                    this.pageCount = Math.floor(this.allDeptEmployees.length / PaginateService.getPageSize());
                    this.selectPageHandler(this.$route.query.page);
                    this.$store.commit('setHeader', dept.dept_name);
                });
            },

            selectPageHandler(pageNumber) {
                pageNumber = PaginateService.validatePageNumber('department' , pageNumber);
                this.currentPage = parseInt(PaginateService.getCurrentPage());
                this.pageEmployees = PaginateService.getDeptEmployeesForPage(this.allDeptEmployees, pageNumber);
                this.setSearch();
            },

            setSearch() {
                SearchService.clearSearchList();
            }
        }
    }
</script>

<style scoped lang="scss">

    h2 {
        font-size: $block-header-size;
    }

    h4 {
        font-size: $list-header-size;
        font-weight: 700;
    }

    .container {
        width: 100%;
        height: auto;
        margin-top: 30px;
    }

    .page-logo {
        display: none;
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

    .top-link {
        margin: 20px 0 10px 0;

        &>a {
            color: $darkest-blue !important;
            font-size: $default-text-size;
            display: flex;
            align-items: center;

            &:hover {
                text-decoration: none;
            }
        }
    }

    .top-link-right-arrow-icon {
        width: 30px;
        padding: 5px;
        border-radius: 50%;
        transition: 0.3s ease;
        transform: rotate(180deg);

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
