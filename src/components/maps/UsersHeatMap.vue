<template>
  <div class="card">
    <div class="card-header">
      Users HeatMap
    </div>
    <div class="card-body">
      <heat-map-filter @radiusSearchResult="getRadiusSearchResult"></heat-map-filter>
      <vue-google-heatmap
        v-if="!isUserDataLoading"
        :points="getCoordinates"
        :lat="getCenterLat"
        :lng="getCenterLng"
        :initial-zoom="zoomLevel"
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
import HeatMapFilter from './HeatMapFilter'
import env from '../../../env'
import {GET} from '../../utils/request.js'
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
      interval: null,
      zoomLevel: 8,
      defaultLat: 0,
      defaultLon: 0
    }
  },
  components: {
    HeatMapFilter
  },
  watch: {
    points: function (val) {
      console.log('parent', this.points)
      this.isUserDataLoading = true
      // also use nextTick this way
      this.$nextTick().then(() => {
        // Add the component back in
        this.isUserDataLoading = false
      })
    }
  },
  computed: {
    displayHeight () {
      return document.documentElement.clientHeight - 200
    },
    getCenterLat () {
      return this.points[0] ? parseFloat(this.points[0].lat) : this.defaultLat
    },
    getCenterLng () {
      return this.points[0] ? parseFloat(this.points[0].lng) : this.defaultLon
    },
    getCoordinates () {
      return this.points
    }
  },
  async mounted () {
    this.isUserDataLoading = true
    await this.getResolvedUsers()
    await this.getUserLocation()
    await this.executeInterval()
    this.isUserDataLoading = false
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
        await this.getUserLocation()
      }, 50000)
    },
    async getResolvedUsers () {
      try {
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
            lat: location ? parseFloat(location.lat) : this.defaultLat,
            lng: location ? parseFloat(location.lon) : this.defaultLon
          }
        })
      } catch (e) {
        this.$iziToast.error({
          title: 'Error',
          message: `SomeThing Went Wrong! - ${e}`
        })
      }
    },
    getRadiusSearchResult (value) {
      this.points = value.userCoordinates
      this.defaultLat = value.searchLat
      this.defaultLon = value.searchLon
    }
  }
}
</script>

<style scoped>

</style>
