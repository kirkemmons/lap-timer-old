// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  lapTimesDataValidator,
  lapTimesPatchValidator,
  lapTimesQueryValidator,
  lapTimesResolver,
  lapTimesExternalResolver,
  lapTimesDataResolver,
  lapTimesPatchResolver,
  lapTimesQueryResolver
} from './lap-times.schema.js'
import { LapTimesService, getOptions } from './lap-times.class.js'

export const lapTimesPath = 'lap-times'
export const lapTimesMethods = ['find', 'get', 'create', 'patch', 'remove']

export * from './lap-times.class.js'
export * from './lap-times.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const lapTimes = (app) => {
  // Register our service on the Feathers application
  app.use(lapTimesPath, new LapTimesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: lapTimesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(lapTimesPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(lapTimesExternalResolver),
        schemaHooks.resolveResult(lapTimesResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(lapTimesQueryValidator),
        schemaHooks.resolveQuery(lapTimesQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(lapTimesDataValidator),
        schemaHooks.resolveData(lapTimesDataResolver)
      ],
      patch: [
        schemaHooks.validateData(lapTimesPatchValidator),
        schemaHooks.resolveData(lapTimesPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
