<template>
  <div id="app">
    <router-view name="navbar"></router-view>
    <router-view name="sidebar"></router-view>
    <router-view name="unauthorised"></router-view>
    <b-container fluid class="bv-example-row">
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }

  .bv-example-row {
    padding-left: 210px;
    padding-top: 5px;
  }

  @media only screen and (max-width: 500px) {
    .bv-example-row {
      padding-left: 13px;
    }
  }
</style>
