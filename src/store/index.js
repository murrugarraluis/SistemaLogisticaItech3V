import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: null,
    user: {
      username: null,
      token: '',
    },
  },
  mutations: {
    doLogin(state, user) {
      state.auth = true
      state.user.username = user.email
      state.user.token = user.token
    },
    doLogout(state) {
      state.auth = false
      state.user.username = null
      state.user.token = null
    },
  },
  actions: {
    doLogin({ commit }, user) {
      commit('doLogin', user)
    },
    doLogout({ commit }) {
      commit('doLogout')
    },
  },
  modules: {},
})
