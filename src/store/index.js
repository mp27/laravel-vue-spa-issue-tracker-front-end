import Vue from 'vue'
import Vuex from 'vuex'

//modules
import user from './user'
import application from './application'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    application
  }
})
