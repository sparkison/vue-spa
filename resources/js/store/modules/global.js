import * as types from '../mutation-types'

// state
export const state = {
  loading: false,
  online: true, // network status, default to online
  windowWidth: window.innerWidth // watch the window width
}

// getters
export const getters = {
  loading: state => state.loading,
  online: state => state.online,
  windowWidth: state => state.windowWidth,
}

// mutations
export const mutations = {
  [types.SET_LOADER] (state) {
    state.loading = true
  },
  [types.CLEAR_LOADER] (state) {
    state.loading = false
  },
  [types.SET_ONLINE] (state) {
    state.online = true
  },
  [types.SET_OFFLINE] (state) {
    state.online = false
  },
  [types.SET_WINDOW_WIDTH] (state, width) {
    state.windowWidth = width
  },
}

// actions
export const actions = {
  enablePageLoader ({ commit }) {
    commit(types.SET_LOADER)
  },
  disablePageLoader ({ commit }) {
    commit(types.CLEAR_LOADER)
  },
  goOnline ({ commit }) {
    commit(types.SET_ONLINE)
  },
  goOffline ({ commit }) {
    commit(types.SET_OFFLINE)
  },
  setWindowWidth ({ commit }, width) {
    commit(types.SET_WINDOW_WIDTH, width)
  }
}
