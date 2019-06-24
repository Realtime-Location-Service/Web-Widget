import axios from './../axios/main'
import iziToast from './iziToaster'
import router from '../router'

const GET = (url, params = {}, failure = null) => {
  return axios
    .get(url, {
      params
    })
    .catch(
      failure ||
      (error => {
        if (handleError(error)) {
          throw error
        }
        let {
          response: {
            data: {error: errorMessage},
            status: httpCode
          }
        } = error
        console.log(httpCode, errorMessage) // eslint-ignore-line
        throw error
      })
    )
}

const POST = (url, params = {}, failure = null) => {
  return axios.post(url, params).catch(
    failure ||
    (error => {
      if (handleError(error)) {
        throw error
      }
      let {
        response: {
          data: {error: errorMessage},
          status: httpCode
        }
      } = error
      console.log(httpCode, errorMessage)
      throw error
    })
  )
}

const PUT = (url, params = {}, failure = null) => {
  return axios.put(url, params).catch(
    failure ||
    (error => {
      if (handleError(error)) {
        throw error
      }
      let {
        response: {
          data: {error: errorMessage},
          status: httpCode
        }
      } = error
      console.log(httpCode, errorMessage)
      throw error
    })
  )
}

const DELETE = (url, params = {}, failure = null) => {
  return axios.delete(url, params).catch(
    failure ||
    (error => {
      if (handleError(error)) {
        throw error
      }
      let {
        response: {
          data: {error: errorMessage}
        }
      } = error
      console.log(errorMessage)
      throw error
    })
  )
}

function handleError (error) {
  let {
    response: {
      data: {error: errorMessage},
      status: httpCode
    }
  } = error
  if (httpCode === 401) {
    iziToast.error({
      title: 'Log in Timeout!',
      message: 'Please login again'
    })
    router.push({
      name: 'Login'
    })
    return true
  }
  if (httpCode === 422) {
    iziToast.error({
      title: 'Validation Error',
      message: errorMessage.replace(/&/g, '\n').replace(/:/g, ': ')
    })
    return true
  }
  return false
}

export {GET, POST, PUT, DELETE}
