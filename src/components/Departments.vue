<template>
    <div class="container">
        <h2 class="page-logo">Departments</h2>
        <div class="departments-list" v-if="departments.length > 0">
            <div class="department" v-for="department in departments">
                <h4 class="department-name">{{ department.dept_name }}</h4>
                <router-link :to="{ name: 'department', params: { id: department.dept_no } }"><img class="right-arrow-icon" src="../assets/right-arrow-icon.svg" alt=">"></router-link>
            </div>
        </div>
    </div>

</template>

<script>
  import ApiService from '../../src/services/api.service';

  export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      departments: [],
    }
  },
  mounted() {
    this.getDepartments();
  },
  methods: {
    async getDepartments() {
      this.departments = await ApiService.getDepartments();
    }
  }
}
</script>

<style scoped lang="scss">
    .container {
        width: 100%;
        height: auto;
    }

    .page-logo {
        font-family: Merriweather, sans-serif;
    }

    .departments-list {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;
    }

    .department {
        border-bottom: 1px solid #e3e3e3;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .department-name {
        margin: 20px 0;
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
