// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { ObjectIdSchema } from '@feathersjs/schema'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const lapTimesSchema = {
  $id: 'LapTimes',
  type: 'object',
  additionalProperties: false,
  required: ['_id', 'text'],
  properties: {
    _id: ObjectIdSchema(),
    text: { type: 'string' }
  }
}
export const lapTimesValidator = getValidator(lapTimesSchema, dataValidator)
export const lapTimesResolver = resolve({})

export const lapTimesExternalResolver = resolve({})

// Schema for creating new data
export const lapTimesDataSchema = {
  $id: 'LapTimesData',
  type: 'object',
  additionalProperties: false,
  required: ['text'],
  properties: {
    ...lapTimesSchema.properties
  }
}
export const lapTimesDataValidator = getValidator(lapTimesDataSchema, dataValidator)
export const lapTimesDataResolver = resolve({})

// Schema for updating existing data
export const lapTimesPatchSchema = {
  $id: 'LapTimesPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...lapTimesSchema.properties
  }
}
export const lapTimesPatchValidator = getValidator(lapTimesPatchSchema, dataValidator)
export const lapTimesPatchResolver = resolve({})

// Schema for allowed query properties
export const lapTimesQuerySchema = {
  $id: 'LapTimesQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(lapTimesSchema.properties)
  }
}
export const lapTimesQueryValidator = getValidator(lapTimesQuerySchema, queryValidator)
export const lapTimesQueryResolver = resolve({})
