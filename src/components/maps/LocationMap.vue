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
      isFirstTimeLoaded: false,
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
    await this.getUserLocationHistory()
  },
  watch: {
    searchDateFrom: function (val) {
      if (this.isFirstTimeLoaded) {
        this.getUserLocationHistory()
      }
    },
    searchDateTo: function (val) {
      if (this.isFirstTimeLoaded) {
        this.getUserLocationHistory()
      }
    }
  },
  methods: {
    async getUserLocationHistory () {
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

        this.initGoogleMap()

        this.isMapLoaded = true
        this.isFirstTimeLoaded = true
      } catch (e) {
        this.$iziToast.error({
          title: 'Error',
          message: `SomeThing Went Wrong! - ${e}`
        })
      }
    },

    initGoogleMap () {
      let coordinatesLength = this.userCoordinates.length
      let defaultCoordinates = {lat: 0, lng: 0}
      const config = {
        zoom: 13,
        center: coordinatesLength > 1 ? this.userCoordinates[this.userCoordinates.length - 1] : defaultCoordinates
      }
      this.map = new google.maps.Map(this.$el, config)

      this.generatePolyline()
      this.googleMapMarker(coordinatesLength, defaultCoordinates)
    },

    generatePolyline () {
      let mapPloyline = new google.maps.Polyline({
        path: this.userCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      })
      mapPloyline.setMap(this.map)
    },

    googleMapMarker (coordinatesLength, defaultCoordinates) {
      const endIcon = {
        url: require('../../assets/endMarker.png'),
        scaledSize: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(25, 50)
      }

      new google.maps.Marker({
        position: this.userCoordinates[0],
        map: this.map,
        title: 'Start Point'
      })

      new google.maps.Marker({
        position: coordinatesLength > 1 ? this.userCoordinates[this.userCoordinates.length - 1] : defaultCoordinates,
        map: this.map,
        title: 'End Point',
        icon: endIcon,
        animation: google.maps.Animation.DROP
      })
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
