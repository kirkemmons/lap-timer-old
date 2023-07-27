// import Vuex from 'vuex'

// const createStore = () => {
//   return new Vuex.Store({
//     state: {
//       laps: [],
//       lapTimes: []
//     },
//     mutations: {
//       ADD_LAP (state, lap) {
//         state.laps.push(lap)
//       },
//       RESET_LAP (state) {
//         state.laps = []
//       },
//       ADD_LAP_TIME (state, lapTime) {
//         state.lapTimes.push(lapTime)
//       },
//       RESET_LAP_TIMES (state) {
//         state.lapTimes = []
//       }
//     },
//     actions: {
//       addLap ({ commit }, lap) {
//         commit('ADD_LAP', lap)
//       },
//       resetLap ({ commit }) {
//         commit('RESET_LAP')
//       },
//       addLapTime ({ commit }, lapTime) {
//         commit('ADD_LAP_TIME', lapTime)
//       },
//       resetLapTimes ({ commit }) {
//         commit('RESET_LAP_TIMES')
//       }
//     },
//     getters: {
//       laps: state => state.laps,
//       lapTimes: state => state.lapTimes
//     }
//   })
// }

// export default createStore

import { hydrateApi, models } from '~/plugins/feathers'
// const auth = makeAuthPlugin({
//   userService: 'users',
//   state: {},
//   actions: {
//     onInitAuth ({ state, dispatch }, payload) {
//       if (payload) {
//         dispatch('authenticate', { strategy: 'jwt', accessToken: state.accessToken })
//           .then((result) => {
//             // handle success like a boss
//             console.log('logged in')
//           })
//           .catch((error) => {
//             // handle error like a boss
//             console.log(error)
//           })
//       }
//     }
//   }
// })

const requireModule = require.context(
  // The path where the service modules live
  './services',
  // Whether to look in subfolders
  false,
  // Only include .js files (prevents duplicate imports`)
  /.js$/
)
const servicePlugins = requireModule
  .keys()
  .map(modulePath => requireModule(modulePath).default)

export const modules = {
  // Custom modules
}

export const state = () => ({
  // Custom state
})

export const mutations = {
  // Custom mutations
}

export const actions = {
  // Custom actions
  // nuxtServerInit ({ commit, dispatch }, { req }) {
  //   return initAuth({
  //     commit,
  //     dispatch,
  //     req,
  //     moduleName: 'auth',
  //     cookieName: 'feathers-jwt'
  //   })
  // },
  nuxtClientInit ({ state, dispatch, commit }, context) {
    console.log('hydrating')
    hydrateApi({ api: models.api })
    console.log('done hydrating')

    // if (state.auth.accessToken) {
    //   console.log('dispatching')
    //   return dispatch('auth/onInitAuth', state.auth.payload)
    // }
  }
}

export const getters = {
  // Custom getters
}

export const plugins = [...servicePlugins]
