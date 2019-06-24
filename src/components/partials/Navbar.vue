<template>
  <div>
    <b-navbar toggleable="md" type="light" variant="light">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">
        <img
          src="https://cdn.pixabay.com/photo/2013/07/13/14/05/location-162102_960_720.png"
          height="30px"
          alt="Logo"/>
        Location API
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/" v-if="!isUserExist" >Login</b-nav-item>
          <b-nav-item-dropdown right v-if="isUserExist">
            <template slot="button-content"><b>Talha</b></template>
            <b-dropdown-item  href="#">Profile</b-dropdown-item>
            <b-dropdown-item  href="#" @click="logout()">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Types from '../../store/types'
export default {
  data () {
    return {
      name: ''
    }
  },
  computed: mapGetters({
    isUserExist: 'check'
  }),
  methods: {
    async logout () {
      await this.$store.dispatch(Types.actions.ACTION_LOGOUT)
      this.$router.push({name: 'Login'})
    }
  }
}
</script>
<style scoped>
  .navbar {
    background-color: #66a5a0 !important;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10000;
  }

  .nav-link {
    color: white !important;
  }

</style>
