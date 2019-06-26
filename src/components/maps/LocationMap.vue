<template>
  <div v-if="isMapLoaded" class="App" ref="map1" id="map1" style="width: 100%; height: 300px;"></div>
  <div v-else class="text-center text-danger my-2">
    <b-spinner class="align-middle"></b-spinner>
    <strong>Loading...</strong>
  </div>
</template>

<script>
import {
  GET_USER_LOCATION_HISTORY
} from '../../constants/api.js'
import {GET} from './../../utils/request.js'
import _ from 'lodash'
export default {
  name: 'LocationMap',
  data () {
    return {
      isMapLoaded: false,
      location: {},
      userCoordinates: [],
      city: null,
      marker: null,
      map: null
    }
  },
  props: {
    userId: {
      type: String,
      default: null
    },
    google: {
      type: Object || String,
      required: true
    },
    searchDateFrom: {
      type: Number,
      required: true
    },
    searchDateTo: {
      type: Number,
      required: true
    }
  },
  async mounted () {
    if (this.google) {
      await this.getUserLocationHistory()
    }
  },
  watch: {
    searchDateFrom: function (val) {
      this.getUserLocationHistory()
    },
    searchDateTo: function (val) {
      this.getUserLocationHistory()
    }
  },
  methods: {
    async getUserLocationHistory () {
      console.log(this.searchDateFrom)
      this.isMapLoaded = false
      try {
        let response = await GET(GET_USER_LOCATION_HISTORY, {
          user_id: this.userId,
          start_date: this.searchDateFrom,
          end_date: this.searchDateTo
        })

        this.userCoordinates = _.map(response.data.paths, function (res) {
          return {
            lat: res.lat,
            lng: res.lon
          }
        })

        let coordinatesLength = this.userCoordinates.length
        let defaultCoordinates = {lat: 0, lng: 0}

        const config = {
          zoom: 13,
          center: coordinatesLength > 1 ? this.userCoordinates[this.userCoordinates.length - 1] : defaultCoordinates
        }

        this.map = new this.google.maps.Map(this.$el, config)

        const endIcon = {
          url: 'https://cdn2.iconfinder.com/data/icons/picons-basic-2/57/basic2-059_pin_location-512.png',
          scaledSize: new this.google.maps.Size(50, 50),
          origin: new this.google.maps.Point(0, 0),
          anchor: new this.google.maps.Point(25, 50)
        }

        let mapPloyline = new this.google.maps.Polyline({
          path: this.userCoordinates,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        })

        mapPloyline.setMap(this.map)
        // start position
        // eslint-disable-next-line no-new
        new this.google.maps.Marker({
          position: this.userCoordinates[0],
          map: this.map,
          title: 'Start Point'
        })
        // last position
        // eslint-disable-next-line no-new
        new this.google.maps.Marker({
          position: coordinatesLength > 1 ? this.userCoordinates[this.userCoordinates.length - 1] : defaultCoordinates,
          map: this.map,
          title: 'End Point',
          icon: endIcon,
          animation: this.google.maps.Animation.DROP
        })
        this.isMapLoaded = true
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

<style>
  html,
  body {
    margin: 0;
    padding: 0;
  }

  .App {
    width: 100vw;
    height: 100vh;
  }
</style>
