import axios from 'axios'
const env = require('../../env')
const main = axios.create({
  baseURL: env.apiUrl,
  headers: {
    // Authorization: `Bearer ${this.store.auth.getters.token}`,
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/html; charset=utf-8'
  }
})

export default main
