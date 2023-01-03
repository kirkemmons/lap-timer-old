<template lang="pug">
  // Let's make this container not fluid
  v-container(
    fluid
  )
    v-row.mt-8(
      justify="center"
    )
      v-col.text-center(
        cols="8"
        sm="6"
        md="5"
      )
        v-card.pt-3
          // Let's put this guy in a v-card
          v-card-title.justify-center.black--text.font-weight-bold.display-1(

          ) {{ time }}
            v-card-text
              v-list
                v-btn.mb-4(
                  color="green"
                  elevation="10"
                  text
                  block
                  @click="start"
                ) Start
                v-btn.mb-4(
                  color="blue"
                  elevation="10"
                  text
                  block
                  @click="lap"
                ) Lap
                v-btn.black--text.mb-4(
                  color="red"
                  elevation="10"
                  text
                  block
                  @click="stop"
                ) Stop
                v-btn.black--text(
                  color="orange"
                  elevation="10"
                  text
                  block
                  @click="reset"
                ) Reset

    v-row.my-6(
      justify="center"
    )
      v-col.text-center(
        cols="12"
        md="4"
      )
        div.my-2.white--text(v-for="(lap, i) in laps"
          :key="i"
        ) Lap {{ i + 1 }}: {{ lap.seconds }}

        v-btn.mt-8(
          icon
          color="orange lighten-3"
          dark
          href="https://github.com/kirkemmons" target="_blank"
        )
          v-icon mdi-crown-outline

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

@media (min-width: 1020px) {
  .v-card {
    max-width: 310px;
    margin-left: auto;
    margin-right: auto;
  }
}

.v-list .v-btn {
  opacity: 0.9;
  border: thin solid black;
}

.v-btn {
  opacity: 0.8;
  border: thin solid black;
}

</style>
