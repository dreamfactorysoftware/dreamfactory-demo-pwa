<template>
  <div class="home">
    <Departments />
  </div>
</template>

<script>
// @ is an alias to /src
import Departments from "../components/Departments";

export default {
  name: 'departments',
  components: {
    Departments
  }
}
</script>
