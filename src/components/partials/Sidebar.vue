<template lang="html">
  <b-nav class="sidebar" vertical="vertical" :class="{ open: sidebarOpen }">
    <!--<b-nav-text>Users</b-nav-text>-->
    <b-nav-item :to="{name: 'UserList'}">User List</b-nav-item>
    <b-nav-item :to="{name: 'UsersHeatMap'}">Users Heatmap</b-nav-item>
  </b-nav>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    sidebarOpen: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
  .sidebar {
    background: whitesmoke;
    transition: all 0.4s cubic-bezier(0.4, 0, 0, 1);
    position: fixed;
    height: 100%;
    overflow-y: scroll;
    width: 200px !important;
    border-right: 1px solid #d8d8d8;
  }

  /*.nav-link {*/
    /*color: white !important;*/
  /*}*/

  @media only screen and (max-width: 500px) {
    .sidebar {
      transform: translate(-1000px, 0);
    }
  }
</style>
