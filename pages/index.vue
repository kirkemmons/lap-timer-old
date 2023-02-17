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

    v-row.my-10(
      justify="center"
    )
      v-col(
        cols="9"
        md="4"
      )
        v-data-table.my-3(
          :headers="headers"
          :items="laps"
          class="elevation-18"
          no-data-text="No laps have been recorded"
        )

      v-col(
        cols="9"
        md="4"
      )
        v-card.my-3
          v-sheet(
            color="transparent"
          )
            v-sparkline(
              :smooth="16"
              :gradient="['#1feaea', '#f72047', '#ffd200']"
              :line-width="3"
              :value="lapTimes"
              class="elevation-18"
              auto-draw
              stroke-linecap="round"
            )

    v-row.my-6(
    )
      v-col.text-center(
      )
        v-btn.my-2(
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

const duration = require('dayjs/plugin/duration')
dayjs.extend(duration)

export default {

  data () {
    return {
      headers: [
        { text: 'Lap #', align: 'left', value: 'name' },
        { text: 'Lap Time', align: 'left', value: 'seconds' }
      ],
      timerState: 'stopped',
      currentTimer: 0,
      time: '00:00:00',
      ticker: undefined,
      laps: [],
      lapTimes: []
    }
  },

  methods: {
    // The start function starts the timer by calling the tick function if it is not already running.
    start () {
      if (this.timerState !== 'running') {
        this.tick()
        this.timerState = 'running'
      }
    },

    // The tick function increments the currentTimer variable by 1 every 10 milliseconds and updates the time variable with the current time in the HH:mm:ss format using the formatTime function.
    tick () {
      this.ticker = setInterval(() => {
        this.currentTimer++
        this.time = this.formatTime(this.currentTimer)
      }, 10)
    },

    // The formatTime function takes the number of seconds passed as an argument and uses the dayjs library to create a new dayjs object representing the current time (measuredTime), adds the number of seconds passed to it and returns the resulting time in the HH:mm:ss format.
    formatTime (seconds) {
      const measuredTime = dayjs().startOf('day').add(seconds, 'second')
      return measuredTime.format('HH:mm:ss')
    },

    lap () {
      // This lap function first checks the value of the timerState variable. If the timerState is not running, the function immediately returns without executing the rest of the code.
      if (this.timerState !== 'running') {
        return
      }
      const lapTimeSeconds = dayjs.duration(this.currentTimer, 'milliseconds').asSeconds()
      this.laps.push({
        name: `Lap ${this.laps.length + 1}`,
        seconds: this.formatTime(this.currentTimer)
      })
      this.lapTimes.push(lapTimeSeconds)
      this.currentTimer = 0

      // Save lap times to localStorage
      const storedLaps = JSON.parse(localStorage.getItem('laps')) || []
      storedLaps.push({
        name: `Lap ${this.laps.length}`,
        seconds: lapTimeSeconds
      })
      localStorage.setItem('laps', JSON.stringify(storedLaps))
    },

    // The stop function stops the timer by clearing the interval that was set with the setInterval function in the tick function and sets the timerState to 'paused'.
    stop () {
      window.clearInterval(this.ticker)
      this.timerState = 'paused'
    },

    // The reset function stops the timer by clearing the interval that was set with the setInterval function in the tick function, sets the timerState to 'stopped', resets the time to '00:00:00', sets the currentTimer to 0, and empties the laps array.
    reset () {
      window.clearInterval(this.ticker)
      this.timerState = 'stopped'
      this.time = '00:00:00'
      this.currentTimer = 0
      this.laps = []
      this.lapTimes = []

      // Remove lap times from localStorage
      localStorage.removeItem('laps')
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
