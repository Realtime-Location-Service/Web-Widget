import store from '../store/index'

const guestMiddleware = next => {
  if (store.state.auth.token) {
    return next({
      name: 'UserList'
    })
  } else {
    return next()
  }
}

// eslint-disable-next-line no-unused-vars
const authMiddleware = (next, to) => {
  if (store.state.auth.token) {
    return next()
  } else {
    return next({
      name: 'Login'
    })
  }
}

const basicMiddleware = next => {
  return next()
}

export {guestMiddleware, authMiddleware, basicMiddleware}
