<template>

    <div class="container">
        <h2 class="page-logo">Departments</h2>
        <div class="departments-list" v-if="departments.length > 0">
            <div class="department" v-for="department in departments">
                <router-link :to="{ name: 'department', params: { id: department.dept_no } }">
                    <h4 class="department-name">{{ department.dept_name }}</h4>
                    <img class="right-arrow-icon" src="../assets/right-arrow-icon.svg" alt=">">
                </router-link>
            </div>
        </div>
    </div>

</template>

<script>
  import ApiService from '../../src/services/api.service';
  import SearchService from "../services/search.service";

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
        SearchService.clearSearchList();
        SearchService.setSearchList(this.departments.map(d => {
            return {
                id: d.dept_no,
                search_item: `${d.dept_name}`
            }
        }), 'department');
    }
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

        &>a {
            display: flex;
            justify-content: space-between;
            align-items: center;

            &:hover {
                text-decoration: none;
                cursor: pointer;
            }
        }
    }

    .department-name {
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
