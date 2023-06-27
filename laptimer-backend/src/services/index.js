import { lapTimes } from './lap-times/lap-times.js'

export const services = (app) => {
  app.configure(lapTimes)

  // All services will be registered here
}
