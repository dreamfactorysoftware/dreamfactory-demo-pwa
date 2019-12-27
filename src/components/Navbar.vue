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
            <router-link :to="{name: 'home'}">
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
        <div class="searchbar dropdown">
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="`Search ${searchPlaceholder}`"
            :disabled="searchIsNotAllowed"
          >
          <button
            id="dropdownMenuButton1"
            class="dropdown-toggle"
            :disabled="searchQuery.length < 4"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            @click="search(searchQuery)"
          >
            <md-icon class="search-icon">
              search
            </md-icon>
          </button>
          <div
            class="search-result dropdown-menu dropdown-menu-right"
            aria-labelledby="dropdownMenuButton1"
          >
            <div
              v-if="searchResult.list && searchResult.list.length === 0"
              class="dropdown-item"
            >
              <p>No result</p>
            </div>
            <router-link
              v-for="item in searchResult.list"
              :to="{ name: searchResult.routeName, params: { eid: item.id } }"
              class="dropdown-item"
            >
              <p>{{ item.search_item }}</p>
              <img
                class="right-arrow-icon"
                src="../assets/right-arrow-icon.svg"
                alt=">"
              >
            </router-link>
          </div>
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
            <router-link :to="{name: 'home'}">
              <img
                src="../assets/acme-logo.png"
                width="150px"
                height="auto"
                alt="Acme logo"
              >
            </router-link>
          </div>

          <div class="sidebar-item sidebar-username">
            <p
              v-if="currentUser.username"
              :title="currentUser.username.replace('+okta_sso', '')"
            >
              Hi {{ currentUser.username.replace('+okta_sso', '') }}
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
              :to="{name: 'departments'}"
              class="sidebar-link"
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
            >
              <md-icon>group</md-icon>
              Employees
            </router-link>
          </div>
          <div
            class="sidebar-item"
            @click="showSidebar = false"
          >
            <router-link
              :to="{name: 'customers'}"
              class="sidebar-link"
            >
              <md-icon>accessibility_new</md-icon>
              Customers
            </router-link>
          </div>
          <div
            v-if
            class="sidebar-item"
            class="sidebar-item sidebar-link-item"
            @click="showSidebar = false"
          >
            <router-link
              :to="{name: 'map'}"
              class="sidebar-link"
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
            >
              Contact support
            </router-link>
            <router-link
              :to="{name: 'support'}"
              class="sidebar-link"
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
                searchResult: [],
                currentUser: {},
                showSidebar: false,
                searchIsNotAllowed: true,
                searchPlaceholder: '',
                header: this.getHeader,
            }
        },
        computed: {
        ...mapGetters([
            'getHeader'
        ])
        },
        watch: {
            $route(to, from) {
                this.searchQuery = '';
                this.showSidebar = false;

                this.setSearchPlaceholder(to);
            },

            getHeader() {
              this.header = this.getHeader;
            }
        },
        mounted() {
            AuthService.getPayload(this.$route.query.jwt || AuthService.getToken())
                .then(user => {
                    this.currentUser = user;
                });
            this.setSearchPlaceholder(this.$route);
        },
        methods: {
            search(query) {
                this.searchResult = SearchService.searchHandler(query);
            },
            logout() {
                AuthService.logout();
                this.$router.push({name: 'login'});
            },
            setSearchPlaceholder(route) {
                if (route.name === 'employees' || route.name === 'department' || route.name === 'departments') this.searchIsNotAllowed = false;
                else this.searchIsNotAllowed = true;

                if(route.name === 'employees' || route.name === 'department') this.searchPlaceholder = 'for employees';
                else if(route.name === 'departments') this.searchPlaceholder = 'for departments';
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
        font-weight: 600;
      }
    }

    /* SEARCH BAR STYLES */
    .searchbar {
        width: 100%;
        margin: 0 0 0 15px;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        &>input {
            background-color: $white;
            width: 80%;
            border: none;
            padding: 6px;
            font-size: $default-text-size;
        }

        &>button {
            background-color: transparent;
            border: none;
            width: auto;
            height: auto;
            padding: 6px;
            margin-left: 10px;
            transition: .2s ease;

            &:hover {
              background-color: rgba(255,255,255,0.1);
              border-radius: 50%;
              cursor: pointer;
            }
        }
    }

    .search-icon {
        color: $white !important;
    }

    .search-result {
        width: 250px;
        height: auto;
        border: none;
        border-radius: 6px;
        box-shadow: 0 20px 10px -10px rgba(0,0,0,0.15), 0 0 10px 0 rgba(0,0,0,0.1);
        padding: 10px 0;
    }

    .dropdown-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: $darkest-blue !important;

        &:active {
            background-color: $light-gray;
        }

        &:hover {
            text-decoration: none;
        }
    }

    .dropdown-toggle {

        &::after {
          display: none;
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
