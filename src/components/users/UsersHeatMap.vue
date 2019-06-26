<template>
  <div class="card">
    <div class="card-header">
      Users HeatMap
    </div>
    <div class="card-body">
      <vue-google-heatmap
        v-if="!isUserDataLoading"
        :points="points"
        :lat="getCenterLat"
        :lng="getCenterLng"
        :initial-zoom="3"
        :width="displayWidth"
        :height="displayHeight">
      </vue-google-heatmap>
      <div v-else class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
    </div>
  </div>
</template>

<script>
import env from '../../../env'
import {GET} from './../../utils/request.js'
import {
  RESOLVE_USERS_BY_API_KEY,
  GET_USER_LOCATION
} from '../../constants/api.js'
import _ from 'lodash'
import VueGoogleHeatmap from 'vue-google-heatmap'
import Vue from 'vue'
Vue.use(VueGoogleHeatmap, {
  apiKey: env.googleApiKey
})
export default {
  name: 'UsersHeatMap',
  data () {
    return {
      points: [],
      userList: [],
      isUserDataLoading: true,
      interval: null
    }
  },
  computed: {
    displayHeight () {
      return document.documentElement.clientHeight - 200
    },
    displayWidth () {
      let size = document.documentElement.clientWidth
      if (size > 300) {
        return size - 275
      }
      return size
    },
    getCenterLat () {
      return this.points[0] ? parseFloat(this.points[0].lat) : 0
    },
    getCenterLng () {
      return this.points[0] ? parseFloat(this.points[0].lng) : 0
    }
  },
  async mounted () {
    await this.getResolvedUsers()
    await this.executeInterval()
  },
  beforeDestroy () {
    console.log('destroy heatmap interval')
    clearInterval(this.interval)
  },
  methods: {
    async executeInterval () {
      this.interval = setInterval(async () => {
        console.log('interval heatmap execute')
        await this.getResolvedUsers()
      }, 50000)
    },
    async getResolvedUsers () {
      try {
        this.isUserDataLoading = true
        let response = await GET(RESOLVE_USERS_BY_API_KEY, {appKey: this.$store.getters.appKey})
        let subordinates = response.data.subordinates
        subordinates.push({
          user_id: response.data.user_id,
          role: response.data.role,
          created_at: null
        })
        let userArray = _.map(subordinates, function (subordinate) {
          return subordinate.user_id
        })
        this.userList = userArray.join(',')
        await this.getUserLocation()
        this.isUserDataLoading = false
      } catch (e) {
        this.$iziToast.error({
          title: 'Error',
          message: `SomeThing Went Wrong! ${e}`
        })
      }
    },
    async getUserLocation () {
      try {
        let response = await GET(GET_USER_LOCATION, {user_ids: this.userList})
        let locationResponse = response.data.data
        this.points = _.map(_.values(locationResponse), function (location) {
          return {
            lat: location ? parseFloat(location.lat) : 0,
            lng: location ? parseFloat(location.lon) : 0
          }
        })
      } catch (e) {
        this.$iziToast.error({
          title: 'Error',
          message: `SomeThing Went Wrong! - ${e}`
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
