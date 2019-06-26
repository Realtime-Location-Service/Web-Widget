<template>
  <div>
    <b-form inline>
      <b-form-group description="Radius" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="radius"
          size="sm"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="1000">
        </b-form-input>
      </b-form-group>
      <b-form-group description="Radius Unit" label-for="input-2">
        <b-form-select
          id="input-2"
          v-model="unit"
          :options="units"
          size="sm"
          class="mb-3 mr-sm-2 mb-sm-0">
        </b-form-select>
      </b-form-group>
      <b-form-group description="Data Limit" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="limit"
          size="sm"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="1000">
        </b-form-input>
      </b-form-group>

      <b-form-group description="Latitude" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="latitude"
          size="sm"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="1000">
        </b-form-input>
      </b-form-group>
      <b-form-group description="Longitude" label-for="input-5">
        <b-form-input
          id="input-5"
          v-model="longitude"
          size="sm"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="1000">
        </b-form-input>
      </b-form-group>

      <b-button class="searchButton" size="sm" @click="filterHeatMap()" variant="outline-primary">Search</b-button>
    </b-form>
    <br>
  </div>
</template>

<script>
import {SEARCH_USER_BY_RADIUS} from '../../constants/api'
import {GET} from '../../utils/request.js'
export default {
  name: 'HeatMapFilter',
  data () {
    return {
      radius: 100,
      latitude: 0,
      longitude: 0,
      unit: 'km',
      units: [
        { value: 'km', text: 'Kilometer' },
        { value: 'm', text: 'Meter' }
      ],
      limit: 100,
      userCoordinates: []
    }
  },
  created () {
    this.getCurrentLocation()
  },
  methods: {
    async filterHeatMap () {
      await this.getSearchCoordinates()
      this.emitToParenT()
    },
    getCurrentLocation () {
      navigator.geolocation.getCurrentPosition(this.geoSuccess)
    },
    geoSuccess (position) {
      this.latitude = position.coords.latitude
      this.longitude = position.coords.longitude
    },
    async getSearchCoordinates () {
      try {
        let response = await GET(SEARCH_USER_BY_RADIUS, {
          radius: this.radius,
          lat: this.latitude,
          lon: this.longitude,
          unit: this.unit,
          limit: this.limit
        })
        this.userCoordinates = _.map(response.data.data, function (res) {
          return {
            lat: res.lat,
            lng: res.lon
          }
        })
      } catch (e) {
        this.$iziToast.error({
          title: 'Error',
          message: `SomeThing Went Wrong! ${e}`
        })
      }
    },
    emitToParenT () {
      this.$emit('radiusSearchResult', {
        userCoordinates: this.userCoordinates,
        searchLat: this.latitude,
        searchLon: this.longitude
      })
    }
  }
}
</script>

<style scoped>
.searchButton {
  margin-top: -23px;
}
</style>
