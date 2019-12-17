<template>
    <div class="container">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item" v-if="currentRoute !== 'home'">
                    <router-link :to="{name: 'home'}">Departments</router-link>
                </li>

                <li class="breadcrumb-item active" aria-current="page">{{getPageName()}}</li>
            </ol>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "Breadcrumb",
        data() {
            return {
                currentRoute: this.$router.currentRoute.name
            }
        },
        mounted() {

        },
        watch: {
            $route(to, from) {
                this.currentRoute = to.name;
            }
        },
        methods: {
            getPageName() {
                if (this.currentRoute === 'home') return 'Departments';
                if (this.currentRoute === 'department') return this.$route.query.name;
                if (this.currentRoute === 'employee') return this.$route.query.name;
            }
        }
    }
</script>

<style scoped>



    .breadcrumb {
        background: none;
        padding: 15px 0;
    }

    @media screen and (min-width: 768px){
        .breadcrumb {
            width: 70%;
            margin: 0 auto;
        }
    }

    @media screen and (min-width: 992px){
        .breadcrumb {
            width: 60%;
            margin: 0 auto;
        }
    }
</style>
