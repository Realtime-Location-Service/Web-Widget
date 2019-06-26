import axios from '../axios/main'

axios.interceptors.request.use((config) => {
  // console.log(config.url)
  return config
})
