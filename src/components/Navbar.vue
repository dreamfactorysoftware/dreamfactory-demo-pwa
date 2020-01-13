<template>
  <div class="main-container">
    <div class="navbar-container">
      <div class="menu-container">
        <div class="menu">
          <div class="menu-item">
            <md-button
              class="md-icon-button"
              @click="showSidebar = true"
            >
              <md-icon class="burger-button">
                menu
              </md-icon>
            </md-button>
          </div>
          <div class="menu-item menu-item-logo">
            <router-link to="/">
              <img
                src="../assets/acme-logo-white.png"
                width="150px"
                height="auto"
                alt="Acme logo"
              >
            </router-link>
          </div>
          <div class="menu-item page-name-item">
            <p>{{ header }}</p>
          </div>
        </div>
        <div class="searchbar" v-if="!searchIsNotAllowed">
          <md-field md-clearable >
            <md-input
            v-model="searchQuery"
            type="text"
            :placeholder="`Search ${searchPlaceholder}`"
            :disabled="searchIsNotAllowed"
            @input="search(searchQuery)"
            />
          </md-field>
        </div>
      </div>
    </div>

    <div class="sidebar-container">
      <md-drawer
        :md-active.sync="showSidebar"
        md-swipeable
      >
        <div class="sidebar">
          <div class="sidebar-item sidebar-logo">
            <router-link to="/">
              <img
                src="../assets/acme-logo-df-blue.png"
                width="150px"
                height="auto"
                alt="Acme logo"
              >
            </router-link>
          </div>

          <div class="sidebar-item sidebar-username">
            <p
              v-if="currentUser && currentUser.username"
              :title="currentUser.username"
            >
              Hi {{ currentUser.username }}
            </p>
          </div>
          <div class="sidebar-item sidebar-title">
            <h5>Menu</h5>
          </div>
          <div
            class="sidebar-item sidebar-link-item"
            @click="showSidebar = false"
          >
            <router-link
              :to="{name: 'home'}"
              class="sidebar-link"
              active-class="sidebar-active"
            >
              <md-icon>home</md-icon>
              Home
            </router-link>
          </div>
          <div
            class="sidebar-item sidebar-link-item"
            @click="showSidebar = false"
          >
            <router-link
              :to="{name: 'departments'}"
              class="sidebar-link"
              active-class="sidebar-active"
            >
              <md-icon>store</md-icon>
              Departments
            </router-link>
          </div>
          <div
            class="sidebar-item sidebar-link-item"
            @click="showSidebar = false"
          >
            <router-link
              :to="{name: 'employees'}"
              class="sidebar-link"
              active-class="sidebar-active"
            >
              <md-icon>group</md-icon>
              Employees
            </router-link>
          </div>
          <div
            class="sidebar-item sidebar-link-item"
            @click="showSidebar = false"
          >
            <router-link
              :to="{name: 'customers'}"
              class="sidebar-link"
              active-class="sidebar-active"
            >
              <md-icon>accessibility_new</md-icon>
              Customers
            </router-link>
          </div>
          <div
            class="sidebar-item sidebar-link-item"
            @click="showSidebar = false"
          >
            <router-link
              :to="{name: 'map'}"
              class="sidebar-link"
              active-class="sidebar-active"
            >
              <md-icon>map</md-icon>
              Map
            </router-link>
          </div>
          <div
            class="sidebar-item sidebar-link-item"
            @click="showSidebar = false"
          >
            <router-link
              :to="{name: 'support'}"
              class="sidebar-link"
              active-class="sidebar-active"
            >
              <md-icon>contact_support</md-icon>
              Contact support
            </router-link>
          </div>
          <div class="sidebar-item">
            <button
              class="btn btn-primary"
              @click="logout()"
            >
              Logout
            </button>
          </div>
        </div>
      </md-drawer>
    </div>
  </div>
</template>

<script>

    import SearchService from "../services/search.service";
    import AuthService from "../services/auth.service";
    import {mapGetters} from "vuex";

    export default {
        name: "Navbar",
        data() {
            return {
                searchQuery: '',
                currentUser: {},
                showSidebar: false,
                searchIsNotAllowed: true,
                searchPlaceholder: '',
                header: this.getHeader,
            }
        },
        computed: {
        ...mapGetters([
            'getHeader',
            'getSearch'
        ])
        },
        watch: {
            $route(to, from) {
              this.showSidebar = false;
              if (typeof to.query.search === 'undefined' || to.query.search === '') {
                 this.searchQuery = '';
                 SearchService.clearSearch();
              }
              this.setSearchPlaceholder(to);
            },

            searchQuery(){
              if (this.searchQuery.length < 2) {
                SearchService.clearSearch();
              }
            },

            getHeader() {
              this.header = this.getHeader;
            }
        },
        mounted() {
            AuthService.getPayload(this.$route.query.jwt || AuthService.getToken())
                .then(user => {
                    if (user) {
                      this.currentUser = user;
                    }
                });
          if (this.$route.query.search) {
            this.searchQuery = this.$route.query.search;
            SearchService.searchHandler(this.$route, this.searchQuery);
          }
          this.setSearchPlaceholder(this.$route);
        },
        methods: {
            search(query) {
              this.$router.push({ query: { ...this.$route.query, search: query }});
              this.debounce(this.$route, query);
            },
            debounce: SearchService.debounce((route, _query) => {
              if (_query.length >= 2) {
                SearchService.searchHandler(route, _query);
              }
            }, 1000),
            logout() {
                AuthService.logout();
                this.$router.push({name: 'login'});
            },
            setSearchPlaceholder(route) {
                if (route.name === 'employees' || route.name === 'department' || route.name === 'departments') this.searchIsNotAllowed = false;
                else this.searchIsNotAllowed = true;

                if(route.name === 'employees' || route.name === 'department') this.searchPlaceholder = 'for employees';
                else if(route.name === 'departments') this.searchPlaceholder = 'for departments';
                else if(route.name === 'customers') this.searchPlaceholder = 'for customers';
                else this.searchPlaceholder = '';
            },
        }
    }
</script>

<style scoped lang="scss">

    h3 {
        margin: 0;
    }

    p {
        margin: 0;
    }

    .main-container {
        width: 100%;
    }

    .navbar-container {
        width: 100%;
        top: 0;
        height: auto;
        background-color: $light-blue;
        transition: 0.3s ease;
        box-shadow: 0 30px 30px -25px rgba(0,0, 0, 0.1);
    }

    .menu-container {
        padding: 20px 15px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }

    .menu {
        display: grid;
        align-items: center;
        grid-template-columns: 0.3fr 1.4fr 0.3fr;
        width: 100%;
        /*justify-content: flex-start;*/
    }

    .menu-item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 5px;
        color: $white
    }

    .burger-button {
      color: $white !important;
    }

    .menu-item-logo {
      display: none;
    }

    .page-name-item {
      display: flex;
      justify-self: center;
      &>p {
        font-size: 1.2rem;
        font-weight: 700;
      }
    }

    /* SEARCH BAR STYLES */
    .searchbar {
        width: 90%;
        margin: 0 0 0 15px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .md-field {
        &>input {
            background-color: $white;
            width: 90%;
            border: none;
            padding: 6px;
            font-size: $default-text-size;
        }
    }

    /* SIDEBAR STYLES */

    .md-drawer {
      position: fixed;
      width: 280px;
      height: 100vh;
    }

    .sidebar {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      padding-bottom: 70px;
    }

    .sidebar-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      font-family: Lato, sans-serif;
      font-size: $default-text-size;
      text-align: left;
      padding: 15px 20px;
      margin: 0;

      &:last-of-type {
        margin-top: 30px;
      }
    }

    .sidebar-link {
      padding: 15px 20px;
      color: $darkest-blue !important;

      &:hover {
        text-decoration: none;
        cursor: pointer;
      }
    }

    .sidebar-logo, .sidebar-username {
      margin: 30px 0;
    }

    .sidebar-username {
      margin-top: 0;
      & > p {
        word-break: break-all;
      }
    }

    .sidebar-link-item {
      padding: 0;
      transition: .2s ease;

      & > a {
        width: 100%;

        & > i {
          margin-right: 8px;
        }
      }

      &:hover {
        background-color: #f2f2f7;
        cursor: pointer;
      }
    }

    .sidebar-active {
      background-color: #f8f8fb;

      & > i {
        color: $light-blue!important;
      }

    }

    /* MEDIA QUERY*/
    @media screen and (min-width: 768px){
      .menu-container {
        width: 70%;
        margin: 0 auto;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }

      .searchbar {
        width: 300px;
        margin: 0;
      }

      .menu {
        display: flex;
        width: auto;
      }

      .menu-item {
        margin: 0;
      }

      .menu-item-logo {
        display: flex;
      }

      .page-name-item {
        display: none;
      }
    }

    @media screen and (min-width: 992px){
      .menu-container {
        width: 60%;
        margin: 0 auto;
      }
    }

    @media screen and (min-width: 1200px){
      .searchbar {
        width: 300px;
      }
    }

</style>
