<template>
  <CustomersList />
</template>

<script>
    import CustomersList from "../components/CustomersList";
    export default {
        name: "Customers",
        components: {CustomersList},
        mounted() {
          if(process.env.VUE_APP_USE_SALESFORCE === 'false') {
            this.$router.push({name: 'home'});
          }
        }
    }
</script>

<style scoped>

</style>
