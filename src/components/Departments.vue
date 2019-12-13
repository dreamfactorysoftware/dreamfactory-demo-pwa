<template>

    <p>{{departments}}</p>

</template>

<script>
  import ApiService from '../../src/services/api.service';

  export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      departments: {},
    }
  },
  mounted() {
    this.getDepartments();
  },
  methods: {
    async getDepartments() {
      this.departments = await ApiService.getDepartments();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
