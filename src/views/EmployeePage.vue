<template>
    <div class="container">
        <div class="top-link">
            <router-link :to="goToEmployeesRoute"><img src="../assets/right-arrow-icon.svg" class="right-arrow-icon" alt="back">Go to employee directory</router-link>
        </div>
        <div class="employee-information" v-if="employee.emp_no">
            <h3>{{ `${employee.first_name} ${employee.last_name}` }}</h3>
            <p><b>Birth date:</b> {{ employee.birth_date }}</p>
            <p><b>Gender:</b> {{ getGender() }}</p>
            <p><b>Hire date:</b> {{ employee.hire_date }}</p>
            <p><b>Email:</b> example@example.com</p>
            <p><b>Office address:</b> <br>
                1234 Jump Street <br>
                Suite 456 <br>
                New York, New York 45678 <br>
                USA
            </p>
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

            if (!AuthService.getToken()) {
                this.$router.push({name: 'login'});
            }

            this.setEmployeesRoute();
        },
        methods: {
            async getEmployeeById(id) {
                this.employee = await ApiService.getEmployeeById(id);
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
    }

    .top-link {
        margin-bottom: 30px;

        &>a {
            color: #3f3f3f !important;
            font-size: 18px;
            display: flex;
            align-items: center;
        }
    }

    .right-arrow-icon {
        width: 30px;
        padding: 5px;
        border-radius: 50%;
        transition: 0.3s ease;
        transform: rotate(180deg);

        &:hover {
            background-color: #f2f2f2;
        }
    }

    .employee-information {

        &>h3 {
            margin-bottom: 15px;
        }

        &>p {
            font-size: 16px;
            line-height: 1.5;
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
