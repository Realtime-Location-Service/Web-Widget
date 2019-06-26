<template>
  <div>
    <b-form inline>
      From: &nbsp;
      <b-form-input id="type-date" v-model="searchDateFrom" type="date" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Jane Doe"></b-form-input>
      To: &nbsp;
      <b-form-input id="type-date" v-model="searchDateTo" type="date" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Jane Doe"></b-form-input>
      <b-button @click="dateSubmit()" variant="outline-primary">Search</b-button>
    </b-form>
    <br>
  </div>
</template>

<script>
export default {
  name: 'MapFilter',
  data () {
    return {
      searchDateFrom: '',
      searchDateTo: ''
    }
  },
  mounted () {
    this.currentDateSet()
    this.dateSubmit()
  },
  methods: {
    currentDateSet () {
      var yesterday = new Date(Date.now() - 864e5)
      var searchDateFrom = yesterday.getFullYear() + '-' + ('0' + (yesterday.getMonth() + 1)).slice(-2) + '-' + yesterday.getDate()

      var today = new Date()
      var searchDateTo = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + (today.getDate())

      this.searchDateFrom = searchDateFrom
      this.searchDateTo = searchDateTo
    },
    dateSubmit () {
      console.log(this.searchDateFrom)
      this.$emit('searchDateRage', {
        searchDateFrom: new Date(this.searchDateFrom).getTime() / 1000,
        searchDateTo: new Date(this.searchDateTo).getTime() / 1000
      })
    }
  }
}
</script>

<style scoped>

</style>
