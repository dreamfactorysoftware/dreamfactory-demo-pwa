<template>
  <div class="container">
    <h2 class="page-logo">
      Welcome to Our Newest Employees
    </h2>
    <div class="table-container">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">
              Employee name
            </th>
            <th scope="col">
              Hire date
            </th>
          </tr>
        </thead>
        <tbody v-if="newestEmployees.length > 0">
          <tr
            v-for="employee in newestEmployees"
            :key="employee.emp_no"
            class="row-hover"
            @click="redirectToEmployee(employee.emp_no)"
          >
            <td>{{ `${employee.first_name} ${employee.last_name}` }}</td>
            <td>{{ employee.hire_date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
    import ApiService from "../services/api.service";
    import {mapGetters} from "vuex";
    import router from "../router";

    export default {
        name: "HomePage",
        data() {
            return {
                newestEmployees: [],
            }
        },
        computed: {
          ...mapGetters([
            'getNewestEmployees',
          ])
        },
        mounted() {
            this.getEmployeesForTable();
            this.$store.commit('setHeader', 'Home');
        },
        methods: {
            getEmployeesForTable() {
              if (this.getNewestEmployees.length > 0) {
                this.newestEmployees = this.getNewestEmployees;
              }
              else {
                ApiService.getNewestEmployees().then(employees => {
                  this.newestEmployees = employees;
                    this.$store.commit('setNewestEmployees', employees);
                  });
              }
            },
          redirectToEmployee(emp_no) {
              router.push({ name: 'employee', params: { eid: emp_no} })
          }
        }
    }
</script>

<style scoped lang="scss">

    h2 {
        font-size: $block-header-size;
        font-weight: 700;
    }

    .container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        margin: 30px 0;
    }

    .page-logo {
        font-family: Merriweather, sans-serif;
        padding-left: 10px;
    }

    .table-container {
        width: 100%;
        height: auto;
        margin-top: 20px;
    }

    .row-hover:hover {
      cursor: pointer;
    }

    @media screen and (min-width: 768px){
        .container {
            width: 70%;
            margin: 40px auto 0;
        }
    }

    @media screen and (min-width: 992px){
        .container {
            width: 60%;
            margin: 40px auto 0;
        }
    }
</style>
