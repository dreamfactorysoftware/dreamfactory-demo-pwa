<template>
  <div class="bottom-bar-container">
    <md-bottom-bar
      md-sync-route
      md-type="shift"
    >
      <md-bottom-bar-item
        :to="{name: 'home'}"
        exact
        md-label="Home"
        md-icon="home"
      />
      <md-bottom-bar-item
        :to="{name: 'departments'}"
        md-label="Departments"
        md-icon="store"
      />
      <md-bottom-bar-item
        :to="{name: 'employees'}"
        md-label="Employees"
        md-icon="group"
      />
      <md-bottom-bar-item
        :to="{name: 'customers'}"
        md-label="Customers"
        md-icon="accessibility_new"
      />
      <md-bottom-bar-item
        :to="{name: 'map'}"
        md-label="Map"
        md-icon="map"
      />
    </md-bottom-bar>
  </div>
</template>

<script>
    export default {
        name: "BottomBar"
    }
</script>

<style scoped lang="scss">
  .md-bottom-bar-item {
    text-decoration: none;
  }
</style>
