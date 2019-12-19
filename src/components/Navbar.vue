<template>
    <div class="main-container">
        <div class="navbar-container">
            <div class="menu-container">
                <div class="menu">
                    <div class="menu-item">
                        <md-button class="md-icon-button" @click="showSidebar = true">
                            <md-icon>menu</md-icon>
                        </md-button>
                    </div>
                    <div class="menu-item">
                        <router-link :to="{name: 'home'}">
                            <img src="../assets/dream-factory-logo-blue.svg" width="180px" height="auto" alt="DF logo">
                        </router-link>
                    </div>
                </div>
                <div class="searchbar dropdown">
                    <input type="text" :placeholder="`Search ${searchPlaceholder}`" v-model="searchQuery" :disabled="searchIsNotAllowed">
                    <button class="dropdown-toggle" v-on:click="search(searchQuery)" :disabled="searchQuery.length < 4" id="dropdownMenuButton1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img class="search-icon" src="../assets/search-icon.svg" alt="search">
                    </button>
                    <div class="search-result dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton1">
                        <div class="dropdown-item" v-if="searchResult.list && searchResult.list.length === 0">
                            <p>No result</p>
                        </div>
                        <router-link :to="{ name: searchResult.routeName, params: { id: item.id } }" class="dropdown-item" v-for="item in searchResult.list">
                            <p>{{item.search_item}}</p>
                            <img class="right-arrow-icon" src="../assets/right-arrow-icon.svg" alt=">">
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <div class="sidebar-container">
            <md-drawer :md-active.sync="showSidebar" md-swipeable>
                <div class="sidebar">
                    <div class="sidebar-item">
                        <p v-if="currentUser.username" :title="currentUser.username.replace('+okta_sso', '')">Hi {{currentUser.username.replace('+okta_sso', '')}}</p>
                    </div>
                    <div class="sidebar-item sidebar-title">
                        <h5>Menu</h5>
                    </div>
                    <div class="sidebar-item">
                        <router-link :to="{name: 'departments'}" class="sidebar-link">Departments</router-link>
                    </div>
                    <div class="sidebar-item">
                        <router-link :to="{name: 'employees'}" class="sidebar-link">Employees</router-link>
                    </div>
                    <div class="sidebar-item">
                        <a href="https://www.dreamfactory.com/support/" class="sidebar-link">Contact support</a>
                    </div>
                    <div class="sidebar-item">
                        <button @click="logout()" class="btn btn-secondary">Logout</button>
                    </div>
                </div>
            </md-drawer>
        </div>

    </div>
</template>

<script>

    import SearchService from "../services/search.service";
    import AuthService from "../services/auth.service";

    export default {
        name: "Navbar",
        data() {
            return {
                searchQuery: '',
                searchResult: [],
                currentUser: {},
                showSidebar: false,
                searchIsNotAllowed: true,
                searchPlaceholder: ''
            }
        },
        mounted() {
            AuthService.getPayload(this.$route.query.jwt || AuthService.getToken())
                .then(user => {
                    this.currentUser = user;
                });
            this.setSearchPlaceholder(this.$route);
        },
        watch: {
            $route(to, from) {
                this.searchQuery = '';
                this.showSidebar = false;

                this.setSearchPlaceholder(to);
            }
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
        margin-bottom: 40px;
    }

    .navbar-container {
        width: 100%;
        top: 0;
        height: auto;
        background-color: #f6f6f6;
        transition: 0.3s ease;
        box-shadow: 0 30px 30px -25px rgba(0,0, 0, 0.1);
    }

    .menu-container {
        padding: 25px 15px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }

    .menu {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .menu-item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 15px;
    }

    /* SEARCH BAR STYLES */
    .searchbar {
        width: 100%;
        margin: 0 auto;

        &>input {
            width: 80%;
            border: none;
            border-bottom: 1px solid gray;
            padding: 4px;
            font-size: 16px;
            background-color: inherit;
        }

        &>button {
            background-color: transparent;
            border: none;
            width: auto;
            height: auto;
            padding: 5px;
            margin-left: 10px;
        }

    }

    .search-icon {
        width: 15px;
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
        color: #3f3f3f !important;
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
        padding: 20px;
    }
    .sidebar-item {
        font-family: Lato, sans-serif;
        font-size: 16px;
        text-align: left;
        padding: 5px 0;
        margin: 10px 0;

        &:first-of-type {
            margin-bottom: 50px;

            & > p {
                word-break: break-all;
            }
        }

        &:last-of-type {
            margin-top: 50px;
        }
    }

    .sidebar-link {
        color: #3f3f3f !important;

        &:hover {
            text-decoration: none;
            cursor: pointer;
        }
    }



    /* MEDIA QUERY*/
    @media screen and (min-width: 768px){
        .menu-container {
            width: 80%;
            margin: 0 auto;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }

        .searchbar {
            width: auto;
            margin: 0;
        }

        .user-info {
            margin-left: auto !important;
        }

        .menu-item {
            margin: 0;
        }
    }

    @media screen and (min-width: 992px){
        .menu-container {
            width: 75%;
            margin: 0 auto;
        }
    }

    @media screen and (min-width: 1200px){
        .searchbar > input {
            width: 250px;
        }
    }


</style>
