<template>
  <div class="card">
    <div class="card-header">
      Users HeatMap
    </div>
    <div class="card-body">
      <vue-google-heatmap
        v-if="!isUserDataLoading"
        :points="points"
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
  FETCH_USERS
} from '../../constants/api.js'
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
      isUserDataLoading: true
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
    }
  },
  mounted () {
    this.fetchInitialDataFromApi()
  },
  methods: {
    async fetchInitialDataFromApi () {
      try {
        let response = await GET(FETCH_USERS)
        this.points = response.data.map(function (user) {
          return {
            lat: parseFloat(user.address.geo.lat),
            lng: parseFloat(user.address.geo.lng)
          }
        })
        console.table(this.points) // eslint-disable-line
        this.isUserDataLoading = false
      } catch (e) {
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
