<template>
    <div class="navbar-container">
        <div class="menu-container">
            <div class="menu-item">
                <img src="../assets/dream-factory-logo-blue.svg" width="180px" height="auto" alt="DF logo">
            </div>
            <div class="menu-item searchbar">
                <input type="text" placeholder="Search" v-model="searchQuery">
                <button v-on:click="search(searchQuery)" :disabled="searchQuery.length < 4"><img class="search-icon" src="../assets/search-icon.svg" alt="search"></button>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Navbar",
        data() {
            return {
                searchQuery: ''
            }
        },
        mounted() {

        },
        watch: {

        },
        methods: {
            search(query) {
                console.log(query);
            }
        }
    }
</script>

<style scoped lang="scss">

    h3 {
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

        &>input {
            width: 250px;
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

    @media screen and (min-width: 768px){
        .menu-container {
            width: 70%;
            margin: 0 auto;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }
        .menu-item {
            margin: 0;
        }
    }

    @media screen and (min-width: 992px){
        .menu-container {
            width: 60%;
            margin: 0 auto;
        }
    }


</style>
