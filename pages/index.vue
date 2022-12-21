<template lang="pug">
  // Let's make this container not fluid
  v-container(
  )
    v-row.mt-8(
      justify="center"
    )
      v-col.text-center(
        cols="8"
        sm="4"
      )
        v-card
          // Let's put this guy in a v-card
          v-card-title.justify-center.black--text.font-weight-bold.display-1(

          ) {{ time }}
            v-card-text
              v-list
                v-btn.mb-4(
                  color="green"
                  block
                  @click="start"
                ) Start
                v-btn.mb-4(
                  color="blue"
                  block
                  @click="lap"
                ) Lap
                v-btn.black--text.mb-4(
                  block
                  color="error"
                  @click="stop"
                ) Pause
                v-btn.black--text(
                  block
                  color="warning"
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
          color="orange lighten-3"
          dark
          href="https://github.com/kirkemmons" target="_blank"
        )
          v-icon mdi-crown-outline

        div.mb-2.white--text(v-for="(lap, i) in laps"
          :key="i"
        ) Lap {{ i + 1 }}: {{ lap.seconds }}

</template>

<script>
// TODO: use dayjs for a lot of this. Look up @nuxtjs/dayjs
export default {
  // asyncData ({ $dayjs }) {
  //   return {
  //     now: $dayjs().format('HH:mm:ss')
  //   }
  // },

  data () {
    return {
      timerState: 'stopped',
      currentTimer: 0,
      time: '00:00:00',
      ticker: undefined,
      laps: [],
      latestLap: null,
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
      // TODO: this is putting the time when the lap started into an array. We need how long the particular lap was.
      this.laps.push({
        seconds: this.formatTime(this.currentTimer)
        // You don't need to store this, it can be derived from the seconds. Use Dayjs to do this. Specifically dayjs durations
      })
      this.currentTimer = 0
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
  margin: 0 auto;
  background-color: #333333;
}

</style>
