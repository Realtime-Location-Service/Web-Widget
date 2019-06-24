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
        <template slot="name" slot-scope="row">
          {{ row.value }}
        </template>
        <template slot="email" slot-scope="row">
          {{ row.value }}
        </template>

        <template slot="actions" slot-scope="row">
          <b-button size="sm" @click="row.toggleDetails">
            {{ row.detailsShowing ? 'Hide' : 'Show' }} Location
          </b-button>
        </template>
        <template slot="row-details" slot-scope="row">
          <b-card>
            <location-map :address="row.item.address"></location-map>
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
import {GET} from './../../utils/request.js'
import {
  FETCH_USERS
} from '../../constants/api.js'

export default {
  data () {
    return {
      users: [],
      isUserDataLoading: true,
      perPage: 5,
      currentPage: 1,
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      },
      fields: [
        { key: 'id', label: '#', sortable: true },
        { key: 'name', label: 'Name', sortable: true, class: 'text-center' },
        { key: 'email', label: 'Email' },
        { key: 'actions', label: 'Actions' }
      ]
    }
  },
  components: {
    LocationMap
  },
  computed: {
    rows () {
      return this.users.length
    }
  },
  async mounted () {
    await this.fetchInitialDataFromApi()
  },
  methods: {
    async fetchInitialDataFromApi () {
      try {
        let response = await GET(FETCH_USERS)
        this.users = response.data
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
        let response = await GET(FETCH_USERS)
        this.users = response.data
        this.isUserDataLoading = false
      } catch ($e) {
        this.$iziToast.error({
          title: 'Error',
          message: 'SomeThing Went Wrong!'
        })
      }
    }
  }
}
</script>
<style scoped>
</style>
