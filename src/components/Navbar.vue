<template>
    <div class="navbar-container">
        <div class="menu-container">
            <div class="menu-item">
                <a href="https://www.dreamfactory.com/">
                    <img src="../assets/dream-factory-logo-blue.svg" width="180px" height="auto" alt="DF logo">
                </a>
            </div>
            <div class="menu-item searchbar dropdown">
                <input type="text" placeholder="Search" v-model="searchQuery">
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
            <div class="menu-item user-info dropdown" v-if="currentUser.username">
                Hi,
                <button class="btn btn-link dropdown-toggle" type="button" id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {{currentUser.username.replace('+okta_sso', '')}}
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                    <button class="dropdown-item" @click="logout()">Logout</button>
                </div>
            </div>
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
            }
        },
        mounted() {
            AuthService.getPayload(this.$route.query.jwt || AuthService.getToken())
                .then(user => {
                    this.currentUser = user;
                });
        },
        watch: {
            $route() {
                this.searchQuery = ''
            }
        },
        methods: {
            search(query) {
                this.searchResult = SearchService.searchHandler(query);
                console.log(this.searchResult);
            },
            logout() {
                AuthService.logout();
                this.$router.push({name: 'login'});
            }
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

    .navbar-container {
        top: 0;
        height: auto;
        background-color: #ffffff;
        transition: 0.3s ease;
    }

    .menu-container {
        padding: 25px 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .menu-item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 15px;
    }

    .menu-logo {
        justify-content: center;
    }


    .searchbar {
        order: 2;

        &>input {
            width: 150px;
            border: none;
            border-bottom: 1px solid gray;
            padding: 4px;
            font-size: 16px;
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

    .search-result-visible {
        display: block !important;
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
        color: inherit;
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

    .user-info {
        order: 1;

        & > button {
            padding: 6px 12px 6px 0;
        }
    }

    @media screen and (min-width: 768px){
        .menu-container {
            width: 80%;
            margin: 0 auto;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
        }

        .searchbar {
            order: 2;
            margin-left: 30px!important;
        }

        .user-info {
            order: 3;
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
