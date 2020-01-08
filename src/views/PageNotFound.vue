<template>
  <div class="container">
    <h1>404 Page Not Found</h1>
  </div>
</template>

<script>
    export default {
        name: "PageNotFound",
        mounted() {
          this.$store.commit('setHeader', 'Page not found');
        },
    }
</script>

<style scoped lang="scss">
    .container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        margin: 30px 0;

        & > h1 {
            width: 100%;
            font-family: Raleway, sans-serif;
            font-weight: 600;
            text-align: center;
            margin-top: 50px;
        }
    }

    @media screen and (min-width: 768px){
        .container {
            width: 70%;
            margin: 40px auto 0;
        }
    }

    @media screen and (min-width: 992px){
        .container {
            width: 60%;
            margin: 40px auto 0;
        }
    }
</style>
