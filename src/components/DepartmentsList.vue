<template>
  <div class="container">
    <h2 class="page-logo">
      Departments
    </h2>
    <div
      v-if="departments.length > 0"
      class="departments-list"
    >
      <div
        v-for="department in departments"
        class="department"
      >
        <router-link :to="{ name: 'department', params: { id: department.dept_no } }">
          <h4 class="department-name">
            {{ department.dept_name }}
          </h4>
          <img
            class="right-arrow-icon"
            src="../assets/right-arrow-icon.svg"
            alt=">"
          >
        </router-link>
      </div>
    </div>
    <div v-if="!getSearch.isEmpty && departments.length === 0" class="empty-search"> <h3>No result</h3></div>
  </div>
</template>

<script>
  import ApiService from '../../src/services/api.service';
  import SearchService from "../services/search.service";
  import {mapGetters} from "vuex";

  export default {
  name: 'DepartmentsList',
  data() {
    return {
      departments: [],
    }
  },
  computed: {
    ...mapGetters([
      'getDepartments',
      'getSearch'
    ])
  },
  watch: {
    getSearch() {
      if (!this.getSearch.isEmpty) {
        this.departments = this.getSearch.searchResult;
      } else {
        this.departments = this.getDepartments;
      }
    }
  },
  mounted() {
    this.getDepartmentsList();
    this.$store.commit('setHeader', 'Departments');
  },
  beforeDestroy() {
    SearchService.clearSearch();
  },
  methods: {
    getDepartmentsList() {
      if (this.getDepartments.length > 0) {
        this.departments = this.getDepartments;
      }
      else {
        ApiService.getDepartments().then(departments => {
          this.$store.commit('setDepartments', departments);

          if (!this.getSearch.isEmpty) {
            this.departments = this.getSearch.searchResult;
          } else {
            this.departments = departments;
          }
        });
      }
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
                background-color: $hover-white;
            }
        }
    }

    .department-name {
        margin: 20px 0;
        color: $darkest-blue;
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
