<template lang="pug">
  v-container
    v-row.mt-8(
      justify="center"
    )
      v-col.text-center(
        cols="8"
        sm="6"
        md="5"
      )
        v-card.pt-7.pb-6(
          elevation="18"
        )
          v-card-title.justify-center.display-1(
          ) {{ time }}

            v-card-text.mt-2
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
        div.my-2(

          v-for="(lap, i) in laps"
          :key="i"

        ) Lap {{ i + 1 }}: {{ lap.seconds }}

        v-btn.mt-8(
          icon
          dark
          color="black"
          href="https://github.com/kirkemmons" target="_blank"
        )
          v-icon(
            color="orange"
          ) mdi-crown-outline

</template>

<script>

import dayjs from 'dayjs'

export default {

  data () {
    return {
      timerState: 'stopped',
      currentTimer: 0,
      time: '00:00:00',
      ticker: undefined,
      laps: []
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
      const measuredTime = dayjs().startOf('day').add(seconds, 'second')
      return measuredTime.format('HH:mm:ss')
    },

    lap () {
      if (this.timerState !== 'running') {
        return
      }
      this.laps.push({
        seconds: this.formatTime(this.currentTimer)
        // You don't need to store this, it can be derived from the seconds. Use Dayjs to do this. Specifically dayjs durations
      })
      this.currentTimer = 0
    },

    stop () {
      window.clearInterval(this.ticker)
      this.timerState = 'paused'
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
  background-color: #e0d5d5;
}

@media (min-width: 1020px) {
  .v-card {
    max-width: 310px;
    margin-left: auto;
    margin-right: auto;
  }
}

.v-list .v-btn {
  border: thin solid black;
}

.v-btn {
  border: thin solid black;
}

</style>
