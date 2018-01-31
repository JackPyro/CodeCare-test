import { createActions, handleActions, createAction } from 'redux-actions'

import axios from 'axios'
const defaultState = {
  list: [],
  user: null,
  loading: false,
  error: null
}

const createEventRequest = createAction('CREATE_EVENT_REQUEST')
const createEventSuccess = createAction('CREATE_EVENT_SUCCESS')
const createEventFailure = createAction('CREATE_EVENT_FAILURE')

const authRequest = createAction('AUTH_REQUEST')
const authSuccess = createAction('AUTH_SUCCESS')
const authFailure = createAction('AUTH_FAILURE')

const registerRequest = createAction('REGISTER_REQUEST')
const registerSuccess = createAction('REGISTER_SUCCESS')
const registerFailure = createAction('REGISTER_FAILURE')

const getEventsRequest = createAction('GET_EVENTS_REQUEST')
const getEventsSuccess = createAction('GET_EVENTS_SUCCESS')
const getEventsFailure = createAction('GET_EVENTS_FAILURE')

const EVENT_CREATE_URL = (id) => `/api/events/${id}`
const EVENT_URL = `/api/events/`
const AUTH_URL = `/api/users/login`
const REGISTER_URL = `/api/users`

export const createEvent = (event, id) => {
  return (dispatch) => {
    dispatch(createEventRequest())
    axios.post(EVENT_CREATE_URL(id), {...event})
      .then(res => res.data)
      .then(data => {
        if (!data.error) {
          console.log(data)
          dispatch(createEventSuccess({event: data.event}))
        }
        else {
          dispatch(createEventFailure({error: data.error}))
        }
      })
  }
}

export const getEvents = () => {
  return (dispatch) => {
    dispatch(getEventsRequest())
    axios.get(EVENT_URL)
      .then(res => res.data)
      .then(data => {
        if (!data.error) {
          console.log(data)
          dispatch(getEventsSuccess({events: data.events}))
        }
        else {
          dispatch(getEventsFailure({error: data.error}))
        }
      })
  }
}

export const registerUser = (user) => {
  return (dispatch) => {
    dispatch(registerRequest())
    axios.post(REGISTER_URL, {...user})
      .then(res => res.data)
      .then(data => {
        console.log(data)
        if (!data.error) {
          dispatch(registerSuccess({user: data.user}))
        }
        else {
          dispatch(registerFailure({error: data.error}))
        }
      })
  }
}

export const authUser = (user) => {
  return (dispatch) => {
    dispatch(authRequest())
    axios.post(AUTH_URL, {...user})
      .then(res => res.data)
      .then(data => {
        console.log(data)
        if (!data.error) {
          dispatch(authSuccess({user: data.user}))
        }
        else {
          dispatch(authFailure({error: data.error}))
        }
      })
  }
}

export const {updateEvent, deleteEvent} = createActions({
  UPDATE_EVENT: (event) => ({}),
  DELETE_EVENT: (event) => ({}),
})

export const reducer = handleActions({
  GET_EVENTS_REQUEST: (state, action) => ({...state}),
  GET_EVENTS_SUCCESS: (state, action) => ({...state, list: action.payload.events}),
  GET_EVENTS_FAILURE: (state, action) => ({...state, error: action.payload.error}),
  CREATE_EVENT_REQUEST: (state, action) => ({...state}),
  CREATE_EVENT_FAILURE: (state, action) => ({...state, error: action.payload.error}),
  CREATE_EVENT_SUCCESS: (state, action) => {
    console.log(state)
    return ({...state, list: [...state.list, action.payload.event]})
  },
  UPDATE_EVENT: (state, action) => ({...state}),
  DELETE_EVENT: (state, action) => ({...state}),
  AUTH_REQUEST: (state, action) => ({...state}),
  AUTH_FAILURE: (state, action) => ({...state, error: action.payload.error}),
  AUTH_SUCCESS: (state, action) => ({...state, user: action.payload.user}),
  REGISTER_REQUEST: (state, action) => ({...state}),
  REGISTER_FAILURE: (state, action) => ({...state, error: action.payload.error}),
  REGISTER_SUCCESS: (state, action) => ({...state, user: action.payload.user}),
}, defaultState)

export const getFormattedEvents = (state) => state.events.list
export const getUser = (state) => state.events.user
export const isLoggedIn = (state) => state.events.user && state.events.user._id