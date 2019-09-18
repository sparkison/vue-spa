import * as types from '../mutation-types'

// state
export const state = {
  toggled: true
}

// getters
export const getters = {
  toggled: state => state.toggled
}

// mutations
export const mutations = {
  [types.SET_ADMINBAR_TOGGLE] (state) {
    state.toggled = !state.toggled
  }
}

// actions
export const actions = {
  toggle ({ commit }, payload) {
    commit(types.SET_ADMINBAR_TOGGLE)
  }
}
