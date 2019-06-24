import Cookies from 'js-cookie'
import Types from '../types'

const auth = {
  // state
  state: {
    user: null,
    token: Cookies.get('token')
  },

  // getters
  getters: {
    user: state => state.user,
    token: state => state.token,
    check: state => state.token !== null
  },

  // mutations
  mutations: {
    [Types.mutations.SAVE_TOKEN] (state, {token, remember}) {
      state.token = token
      Cookies.set('token', token, {expires: remember ? 365 : null})
    },

    [Types.mutations.SAVE_USER] (state, {user}) {
      state.user = user
    },

    [Types.mutations.LOGOUT] (state) {
      state.user = null
      state.token = null
      Cookies.remove('token')
    },

    [Types.mutations.UPDATE_USER] (state, {user}) {
      state.user = user
    }
  },
  // actions
  actions: {
    [Types.actions.ACTION_SAVE_TOKEN] ({commit, dispatch}, payload) {
      commit(Types.mutations.SAVE_TOKEN, payload)
    },

    [Types.actions.ACTION_SAVE_USER] ({commit}) {
      commit(Types.mutations.SAVE_USER)
    },

    [Types.actions.ACTION_UPDATE_USER] ({commit}, payload) {
      commit(Types.mutations.UPDATE_USER, payload)
    },

    [Types.actions.ACTION_LOGOUT] ({commit}) {
      commit(Types.mutations.LOGOUT)
    }

  }
}

export default auth
