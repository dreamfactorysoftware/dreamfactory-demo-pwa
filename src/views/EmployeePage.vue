<template>
  <div class="container">
    <div class="top-link">
      <router-link :to="goToEmployeesRoute">
        <img
          src="../assets/right-arrow-icon.svg"
          class="right-arrow-icon"
          alt="back"
        >Go to employee directory
      </router-link>
    </div>
    <div
      v-if="employee.emp_no"
      class="employee-information"
    >
      <div class="info-block">
        <h4 class="employee-name">
          <md-icon>account_circle</md-icon>
          {{ `${employee.first_name} ${employee.last_name}` }}</h4>
        <p>
          <b>Department:</b>
          <span v-for="department in employee.departments_by_dept_emp">
            {{department.dept_name}}
          </span>
        </p>
        <p><b>Birth date:</b> {{ employee.birth_date }}</p>
        <p><b>Gender:</b> {{ getGender() }}</p>
        <p><b>Hire date:</b> {{ employee.hire_date }}</p>
      </div>
      <div class="info-block">
        <h4 v-if="employee.email && employee.telephone"
            class="employee-contacts">
          <md-icon>contacts</md-icon>
          Contacts:
        </h4>
        <p v-if="employee.email">
          <b>Email:</b> {{ employee.email }}
        </p>
        <p v-if="employee.telephone">
          <b>Phone number:</b> {{ employee.telephone }}
        </p>
      </div>
      <div
        v-if="employee.street1 && employee.street2 && employee.city && employee.state && employee.zip"
        class="info-block"
      >
        <h4 class="employee-address">
          <md-icon>business</md-icon>
          Address:
        </h4>
        <p v-if="employee.city">
          <b>City:</b> {{ employee.city }}
        </p>
        <p v-if="employee.street1">
          <b>Street name:</b> {{ employee.street1 }}
        </p>
        <p v-if="employee.street2">
          <b>Street address:</b> {{ employee.street2 }}
        </p>
        <p v-if="employee.zip">
          <b>Postcode:</b> {{ employee.zip }} <router-link
            class="btn btn-link map-link"
            :to="{name: 'map', query: {latitude: employee.zip_coordinates_by_zip.latitude, longitude: employee.zip_coordinates_by_zip.longitude }}"
          >
            look on map
          </router-link>
        </p>
        <p v-if="employee.state">
          <b>State:</b> {{ employee.state }}
        </p>
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
                employee: {},
                goToEmployeesRoute: {}
            }
        },
        mounted() {
            this.getEmployeeById(this.$router.currentRoute.params.eid);

            this.setEmployeesRoute();
        },
        methods: {
            getEmployeeById(id) {
                ApiService.getEmployeeById(id).then(employee => {
                    this.employee = employee;
                    this.$store.commit('setHeader', `${this.employee.first_name} ${this.employee.last_name}`);
                });
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
            },
            setEmployeesRoute() {
                if (this.$route.params.id) {
                    this.goToEmployeesRoute = { name: 'department', params: { id: this.$route.params.id } };
                }
                else {
                    this.goToEmployeesRoute = { name: 'employees'};
                }
            }
        }
    }
</script>

<style scoped lang="scss">

    .container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        margin: 30px 0;
    }

    .top-link {
        margin: 10px 0 20px 0;

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

    .right-arrow-icon {
        width: 30px;
        padding: 5px;
        border-radius: 50%;
        transition: 0.3s ease;
        transform: rotate(180deg);

        &:hover {
            background-color: $light-gray;
        }
    }

    .employee-information {
        width: 100%;
    }

    .info-block {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      & > h4 {
        font-family: Raleway, sans-serif;
        margin-top: 40px;
        margin-bottom: 15px;
        font-size: 1.4rem;
        font-weight: 600;
      }

      .employee-name {
        margin-top: 0;
      }

      &>p {
        font-size: $default-text-size;
        line-height: 1.5;
      }
    }

    .employee-name, .employee-contacts, .employee-address {
      display: flex;
      align-items: center;
      width: 100%;

      & > i {
        margin: 0 8px 0 0;
        color: $light-blue!important;
      }
    }

    .map-link {
        font-size: $default-text-size;
        padding: 0;
        vertical-align: inherit;
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
