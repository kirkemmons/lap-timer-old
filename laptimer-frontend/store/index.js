import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      laps: [],
      lapTimes: []
    },
    mutations: {
      ADD_LAP (state, lap) {
        state.laps.push(lap)
      },
      RESET_LAP (state) {
        state.laps = []
      },
      ADD_LAP_TIME (state, lapTime) {
        state.lapTimes.push(lapTime)
      },
      RESET_LAP_TIMES (state) {
        state.lapTimes = []
      }
    },
    actions: {
      addLap ({ commit }, lap) {
        commit('ADD_LAP', lap)
      },
      resetLap ({ commit }) {
        commit('RESET_LAP')
      },
      addLapTime ({ commit }, lapTime) {
        commit('ADD_LAP_TIME', lapTime)
      },
      resetLapTimes ({ commit }) {
        commit('RESET_LAP_TIMES')
      }
    },
    getters: {
      laps: state => state.laps,
      lapTimes: state => state.lapTimes
    }
  })
}

export default createStore
