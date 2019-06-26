import axios from 'axios'
import store from '../store'
const env = require('../../env')
const main = axios.create({
  baseURL: env.proxiUrl, // need to point here the actual url
  headers: {
    // Authorization: `Bearer ${store.state.auth.appKey}`,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'crossdomain': true,
    'RLS-Referrer': store.state.auth.rlsReferrer,
    'AppKey': store.state.auth.appKey
  }
})

export default main
