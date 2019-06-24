<template>
  <div v-if="isSdkInitialized" class="App" style="width: 100%; height: 300px;"/>
  <div v-else class="text-center text-danger my-2">
    <b-spinner class="align-middle"></b-spinner>
    <strong>Loading...</strong>
  </div>
</template>

<script>
import {MARKER_IMAGE_PATH} from '../../constants/variable'
import MarkerClusterer from '@google/markerclusterer'
import gmapsInit from '../../utils/gmaps'

export default {
  name: 'LocationMap',
  data () {
    return {
      isSdkInitialized: false,
      google: null,
      locations: [],
      city: null
    }
  },
  props: {
    address: {
      type: Object,
      default: () => {
      }
    }
  },
  async mounted () {
    this.locationSet()

    if (!this.isSdkInitialized) {
      await this.googleMapInitilized()
    }

    if (this.isSdkInitialized) {
      await this.locationInitialization()
    }
  },
  methods: {
    locationSet () {
      this.locations = [
        {
          position: {
            lat: parseFloat(this.address.geo.lat),
            lng: parseFloat(this.address.geo.lng)
          }
        }
      ]

      this.city = this.address.city
    },
    async googleMapInitilized () {
      try {
        this.google = await gmapsInit()
        this.isSdkInitialized = true
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
      }
    },
    async locationInitialization () {
      try {
        this.google = await gmapsInit()
        const geocoder = new this.google.maps.Geocoder()
        const map = new this.google.maps.Map(this.$el)
        geocoder.geocode({address: 'India'}, (results, status) => {
          if (status !== 'OK' || !results[0]) {
            throw new Error(status)
          }
          map.setCenter(results[0].geometry.location)
          map.fitBounds(results[0].geometry.viewport)
        })
        const markerClickHandler = (marker) => {
          map.setZoom(13)
          map.setCenter(marker.getPosition())
        }
        const markers = this.locations
          .map((location) => {
            const marker = new this.google.maps.Marker({...location, map})
            marker.addListener('click', () => markerClickHandler(marker))
            return marker
          })
        // eslint-disable-next-line no-new
        new MarkerClusterer(map, markers, {imagePath: MARKER_IMAGE_PATH})
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
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
