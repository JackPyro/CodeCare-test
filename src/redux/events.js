import { createActions, handleActions } from 'redux-actions'
import { events } from '../mock'

const defaultState = {
  list: [],
  loading: false,
}

export const {getEvents, createEvent, updateEvent, deleteEvent} = createActions({
  GET_EVENTS: (token) => ({events}),
  CREATE_EVENT: event => ({event}),
  UPDATE_EVENT: (event) => ({}),
  DELETE_EVENT: (event) => ({}),
})

export const reducer = handleActions({
  GET_EVENTS: (state, action) => ({...state, list: action.payload.events}),
  CREATE_EVENT: (state, action) => {
    console.log(action.payload)
    return ({...state, list: [...state.list, action.payload.event]})
  },
  UPDATE_EVENT: (state, action) => ({...state}),
  DELETE_EVENT: (state, action) => ({...state}),
}, defaultState)

export const getFormattedEvents = (state) => state.events.list