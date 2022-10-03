<template lang="pug">
  v-container(
    fluid
  )
    v-row.mt-8(
      justify="center"
    )
      v-col.text-center(
        cols="12"
        md="4"
      )
        p.white--text {{ time }}
        v-btn(
          @click="start"
        ) Start
        v-btn(
          @click="lap"
        ) Lap
        v-btn(
          @click="stop"
        ) Stop
        v-btn.black--text(
          color="secondary"
          @click="reset"
        ) Reset

    v-row.mb-8(
      justify="center"
    )
      v-col.text-center(
        cols="12"
        md="4"
      )
        v-btn.mb-6(
          icon
          color="cyan"
          dark
        )
          v-icon mdi-account-cowboy-hat

        div.mb-2(v-for="(lap, i) in laps"
            :key="i"
          ) Lap {{ i + 1 }}: {{ lap.time }}

</template>

<script>
export default {

  data () {
    return {
      timerState: 'stopped',
      currentTimer: 0,
      time: '00:00:00',
      ticker: undefined,
      laps: [],
      latestLap: '',
      snackbar: false
    }
  },
  methods: {
    start () {
      if (this.timerState !== 'running') {
        this.tick()
        this.timerState = 'running'
      }
    },

    tick () {
      this.ticker = setInterval(() => {
        this.currentTimer++
        this.time = this.formatTime(this.currentTimer)
      }, 10)
    },

    formatTime (seconds) {
      const measuredTime = new Date(null)
      measuredTime.setSeconds(seconds)
      const MHSTime = measuredTime.toISOString().substr(11, 8)
      return MHSTime
    },

    stop () {
      window.clearInterval(this.ticker)
      this.timerState = 'paused'
    },

    lap () {
      this.laps.push({
        seconds: this.currentTimer,
        time: this.formatTime(this.currentTimer)
      })
      this.latestLap = this.formatTime(this.currentTimer)
    },

    reset () {
      window.clearInterval(this.ticker)
      this.currentTimer = 0
      this.time = '00:00:00'
      this.timerState = 'stopped'
      this.laps = []
    }
  }
}

</script>

<style lang="scss">

.container {
  background-color: gray;
}

</style>
