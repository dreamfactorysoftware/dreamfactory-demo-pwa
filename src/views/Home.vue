<template />

<script>
// @ is an alias to /src

export default {
  name: 'Home',
    mounted() {
        this.$store.commit('setHeader', 'Home');
    }
}
</script>
