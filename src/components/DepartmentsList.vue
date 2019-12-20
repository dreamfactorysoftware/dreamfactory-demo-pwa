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
  name: 'DepartmentsList',
  data() {
    return {
      departments: [],
    }
  },
  mounted() {
    this.getDepartmentsList();
    this.setSearch();
  },
  methods: {
    async getDepartmentsList() {
        this.departments = await ApiService.getDepartments();
    },
    setSearch() {
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
        font-size: $block-header-size;
    }

    h4 {
        font-size: $list-header-size;
    }

    .container {
        width: 100%;
        height: auto;
    }

    .page-logo {
        font-family: Merriweather, sans-serif;
        padding-left: 10px;
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
        border-bottom: 1px solid $light-gray;

        &>a {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 10px;

            &:hover {
                text-decoration: none;
                cursor: pointer;
                background-color: $hover-ghost-white;
            }
        }
    }

    .department-name {
        margin: 20px 0;
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
