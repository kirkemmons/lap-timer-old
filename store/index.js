import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      lapTimes: []
    },
    mutations: {
      ADD_LAP_TIME (state, lapTime) {
        state.lapTimes.push(lapTime)
      },
      RESET_LAP_TIMES (state) {
        state.lapTimes = []
      }
    },
    actions: {
      addLapTime ({ commit }, lapTime) {
        commit('ADD_LAP_TIME', lapTime)
      },
      resetLapTimes ({ commit }) {
        commit('RESET_LAP_TIMES')
      }
    },
    getters: {
      lapTimes: state => state.lapTimes
    }
  })
}

export default createStore
