import Cookies from 'js-cookie'
import Types from '../types'

const auth = {
  state: {
    user: {},
    check: null,
    rlsReferrer: Cookies.get('rlsReferrer'),
    appKey: Cookies.get('appKey')
  },

  getters: {
    user: state => state.user,
    rlsReferrer: state => state.rlsReferrer,
    appKey: state => state.appKey,
    check: state => state.appKey !== null
  },

  mutations: {
    [Types.mutations.SAVE_TOKEN] (state, {appKey, rlsReferrer}) {
      state.appKey = appKey
      state.rlsReferrer = rlsReferrer
      Cookies.set('appKey', appKey, {expires: 365})
      Cookies.set('rlsReferrer', rlsReferrer, {expires: 365})
    },

    [Types.mutations.SAVE_USER] (state, {user}) {
      state.user = user
    },

    [Types.mutations.LOGOUT] (state) {
      state.user = null
      state.appKey = null
      state.rlsReferrer = null
      Cookies.remove('appKey')
      Cookies.remove('rlsReferrer')
    },

    [Types.mutations.UPDATE_USER] (state, {user}) {
      state.user = user
    }
  },

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
