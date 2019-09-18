import * as types from '../mutation-types'

// state
export const state = {
  user: null
}

// getters
export const getters = {
  user: state => state.user
}

// mutations
export const mutations = {
  [types.SET_USER] (state, { user }) {
    // Update the state
    state.user = user
  }
}

// actions
export const actions = {
  setUser ({ commit }, { user }) {
    commit(types.SET_USER, { user })
  }
}
