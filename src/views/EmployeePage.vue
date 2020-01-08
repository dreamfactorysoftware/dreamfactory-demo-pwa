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
          <div
            v-if="editModeEnabled"
            class="employee-name-inputs"
          >
            <input
              v-if="editModeEnabled"
              v-model="editedEmployee.first_name"
              type="text"
              class="edit-input"
            >
            <input
              v-if="editModeEnabled"
              v-model="editedEmployee.last_name"
              type="text"
              class="edit-input"
            >
          </div>
          <span v-else>
            {{ `${employee.first_name} ${employee.last_name}` }}
          </span>
        </h4>
        <p>
          <b>Department:</b>
          {{ mapEmployeeDepartments(employee.departments_by_dept_emp) }}
        </p>
        <p>
          <b>Birth date:</b>
          <input
            v-if="editModeEnabled"
            v-model="editedEmployee.birth_date"
            type="text"
            class="edit-input"
          >
          <span v-else>
            {{ employee.birth_date }}
          </span>
        </p>
        <p>
          <b>Gender:</b>
          <select
            v-if="editModeEnabled"
            v-model="editedEmployee.gender"
            name="gender"
            class="edit-select"
          >
            <option
              value="M"
              :selected="getGender() === 'M'"
            >
              Male
            </option>
            <option
              value="F"
              :selected="getGender() === 'F'"
            >
              Female
            </option>
          </select>
          <span v-else>
            {{ getGender() }}
          </span>
        </p>
        <p>
          <b>Hire date:</b>
          <input
            v-if="editModeEnabled"
            v-model="editedEmployee.hire_date"
            type="text"
            class="edit-input"
          >
          <span v-else>
            {{ employee.hire_date }}
          </span>
        </p>
      </div>
      <div class="info-block">
        <h4
          v-if="employee.email && employee.telephone"
          class="employee-contacts"
        >
          <md-icon>contacts</md-icon>
          Contacts:
        </h4>
        <p v-if="employee.email">
          <b>Email:</b>
          <input
            v-if="editModeEnabled"
            v-model="editedEmployee.email"
            type="text"
            class="edit-input"
          >
          <span v-else>
            {{ employee.email }}
          </span>
        </p>
        <p v-if="employee.telephone">
          <b>Phone number:</b>
          <input
            v-if="editModeEnabled"
            v-model="editedEmployee.telephone"
            type="text"
            class="edit-input"
          >
          <span v-else>
            {{ employee.telephone }}
          </span>
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
          <b>City:</b>
          <input
            v-if="editModeEnabled"
            v-model="editedEmployee.city"
            type="text"
            class="edit-input"
          >
          <span v-else>
            {{ employee.city }}
          </span>
        </p>
        <p v-if="employee.street1">
          <b>Street name:</b>
          <input
            v-if="editModeEnabled"
            v-model="editedEmployee.street1"
            type="text"
            class="edit-input"
          >
          <span v-else>
            {{ employee.street1 }}
          </span>
        </p>
        <p v-if="employee.street2">
          <b>Street address:</b>
          <input
            v-if="editModeEnabled"
            v-model="editedEmployee.street2"
            type="text"
            class="edit-input"
          >
          <span v-else>
            {{ employee.street2 }}
          </span>
        </p>
        <p v-if="employee.zip">
          <b>Postcode:</b>
          <input
            v-if="editModeEnabled"
            v-model="editedEmployee.zip"
            type="text"
            class="edit-input"
          >
          <span v-else>
            {{ employee.zip }}
            <router-link
              class="btn btn-link map-link"
              :to="{name: 'map', query: {latitude: employee.zip_coordinates_by_zip.latitude, longitude: employee.zip_coordinates_by_zip.longitude }}"
            >
              look on map
            </router-link>
          </span>
        </p>
        <p v-if="employee.state">
          <b>State:</b>
          <input
            v-if="editModeEnabled"
            v-model="editedEmployee.state"
            type="text"
            class="edit-input"
          >
          <span v-else>
            {{ employee.state }}
          </span>
        </p>
      </div>
    </div>
    <div
      v-if="getIsAdmin"
      class="edit-buttons-container"
    >
      <button
        class="btn btn-primary"
        @click="editModeEnabled = !editModeEnabled"
      >
        {{ editModeEnabled ? 'Cancel' : 'Edit employee' }}
      </button>
      <button
        v-if="editModeEnabled"
        class="btn btn-primary"
        @click="saveChanges"
      >
        Save changes
      </button>
    </div>
  </div>
</template>

<script>
    import ApiService from "../services/api.service";
    import AuthService from "../services/auth.service";
    import {mapGetters} from "vuex";

    export default {
        name: "EmployeePage",
        data() {
            return {
                employee: {},
                goToEmployeesRoute: {},
                editModeEnabled: false,
                editedEmployee: {}
            }
        },
      computed: {
          ...mapGetters([
            'getIsAdmin'
          ])
      },
        mounted() {
            this.getEmployeeById(this.$router.currentRoute.params.eid);

            this.setEmployeesRoute();
        },
        methods: {
            getEmployeeById(id) {
                ApiService.getEmployeeById(id).then(employee => {
                    this.employee = employee;
                    this.editedEmployee = {...this.employee};
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
            },
            mapEmployeeDepartments(departments) {
                return departments.map(d => d.dept_name).join(', ');
            },
            saveChanges() {
              let tmpEmployeeData = {...this.editedEmployee};
              if (tmpEmployeeData.telephone === this.employee.telephone) {
                delete tmpEmployeeData.telephone;
              }
              ApiService.editEmployee(this.employee.emp_no, tmpEmployeeData)
                  .then(r => {
                    this.employee = {...this.editedEmployee};
                    this.editModeEnabled = false;
                  })
                  .catch(e => {
                    this.editModeEnabled = false;
                    console.error(e);
                  });
            },
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
        width: 100%;
      }

      .employee-name {
        margin-top: 0;
      }

      &>p {
        font-size: $default-text-size;
        line-height: 1.5;
        width: 100%;
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

    .edit-input {
      width: 100%;
      border: 1px solid $light-gray;
      border-radius: 5px;
      padding: 5px;
      margin: 5px 0;
      font-size: $default-text-size;
    }

    .edit-buttons-container {
      margin: 20px 0 80px 0;

      & > button:first-of-type {
        margin-right: 50px;
      }
    }

    .employee-name-inputs {
      width: 100%;
    }

    .edit-select {
      font-weight: bold;
      background-color: $light-blue;
      padding: 5px 10px;
      color: $white;
      border: none;
      border-radius: 5px;
      margin-left: 10px;
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
