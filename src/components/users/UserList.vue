<template>
  <div class="card">
    <div class="card-header">
      Users
    </div>
    <div class="card-body">
      <b-table
        id="my-table"
        show-empty
        stacked="md"
        :busy="isUserDataLoading"
        striped
        responsive
        hover
        :items="users"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage">
        <template slot="id" slot-scope="row">
          {{ row.value }}
        </template>
        <template slot="role" slot-scope="row">
          {{ row.value }}
        </template>
        <template slot="createAt" slot-scope="row">
          {{ row.value }}
        </template>

        <template slot="actions" slot-scope="row">
          <b-button variant="outline-info" size="sm" @click="row.toggleDetails">
            {{ row.detailsShowing ? 'Hide' : 'Show' }} Location History
          </b-button>
        </template>
        <template slot="row-details" slot-scope="row">
          <b-card>
            <location-map-filter @searchDateRage="getSearchDateRage"></location-map-filter>
            <location-map
              :searchDateFrom="searchDateFrom"
              :searchDateTo="searchDateTo"
              :google="google"
              :userId="row.item.user_id">
            </location-map>
          </b-card>
        </template>
        <div slot="table-busy" class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        @change="fetchPaginatedData()"
        aria-controls="my-table">
      </b-pagination>
    </div>
  </div>
</template>

<script>
import LocationMap from '../maps/LocationMap'
import LocationMapFilter from '../maps/LocationMapFilter'
import {GET} from './../../utils/request.js'
import {
  RESOLVE_USERS_BY_API_KEY
} from '../../constants/api.js'
import gmapsInit from '../../utils/gmaps'
export default {
  data () {
    return {
      users: [],
      isUserDataLoading: true,
      perPage: 10,
      currentPage: 1,
      google: null,
      searchDateFrom: 0,
      searchDateTo: 0,
      isGoogleSdkInitialized: false,
      fields: [
        { key: 'user_id', label: '#', sortable: true },
        {
          key: 'role',
          label: 'Role',
          sortable: true,
          class: 'text-center',
          formatter: value => {
            return value.toUpperCase()
          }
        },
        {
          key: 'created_at',
          label: 'Created At',
          formatter: value => {
            return new Date(value).toLocaleDateString()
          }
        },
        { key: 'actions', label: 'Actions' }
      ]
    }
  },
  components: {
    LocationMap,
    LocationMapFilter
  },
  computed: {
    rows () {
      return this.users.length
    }
  },
  async mounted () {
    await this.googleMapInitialized()
    await this.fetchInitialDataFromApi()
  },
  methods: {
    getSearchDateRage (value) {
      this.searchDateFrom = value.searchDateFrom
      this.searchDateTo = value.searchDateTo
    },
    async fetchInitialDataFromApi () {
      try {
        let response = await GET(RESOLVE_USERS_BY_API_KEY, {appKey: this.$store.getters.appKey})
        this.users = response.data.subordinates
        this.users.push({
          user_id: response.data.user_id,
          role: response.data.role,
          created_at: null
        })
        this.isUserDataLoading = false
      } catch ($e) {
        this.$iziToast.error({
          title: 'Error',
          message: 'SomeThing Went Wrong!'
        })
      }
    },
    async fetchPaginatedData () {
      try {
        this.isUserDataLoading = true
        let response = await GET(RESOLVE_USERS_BY_API_KEY, {appKey: this.$store.getters.appKey})
        this.users = response.data
        this.isUserDataLoading = false
      } catch ($e) {
        this.$iziToast.error({
          title: 'Error',
          message: 'SomeThing Went Wrong!'
        })
      }
    },
    async googleMapInitialized () {
      try {
        this.google = await gmapsInit()
        this.isGoogleSdkInitialized = true
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
<style scoped>
</style>
