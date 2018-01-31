import { createActions, handleActions, createAction } from 'redux-actions'
import { createSelector } from 'reselect'
import _ from 'lodash'

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

const deleteEventRequest = createAction('DELETE_EVENT_REQUEST')
const deleteEventSuccess = createAction('DELETE_EVENT_SUCCESS')
const deleteEventFailure = createAction('DELETE_EVENT_FAILURE')

const exportEventRequest = createAction('EXPORT_EVENT_REQUEST')
const exportEventSuccess = createAction('EXPORT_EVENT_SUCCESS')
const exportEventFailure = createAction('EXPORT_EVENT_FAILURE')

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
const EVENT_DELETE_URL = (id) => `/api/events/${id}`
const EVENT_URL = `/api/events/`
const AUTH_URL = `/api/users/login`
const REGISTER_URL = `/api/users`

export const deleteEvent = (id) => {
  return (dispatch) => {
    dispatch(deleteEventRequest())
    axios.delete(EVENT_DELETE_URL(id))
      .then(res => res.data)
      .then(data => {
        if (!data.error) {
          dispatch(deleteEventSuccess({id: data.id}))
        }
        else {
          dispatch(deleteEventFailure({error: data.error}))
        }
      })
  }
}

export const createEvent = (event, id) => {
  return (dispatch) => {
    dispatch(createEventRequest())
    axios.post(EVENT_CREATE_URL(id), {...event})
      .then(res => res.data)
      .then(data => {
        if (!data.error) {
          dispatch(createEventSuccess({event: data.event}))
        }
        else {
          dispatch(createEventFailure({error: data.error}))
        }
      })
  }
}

export const exportEvents = () => {
  return (dispatch) => {
    dispatch(exportEventRequest())
    axios.get(EVENT_URL + '/export')
      .then(res => res.data)
      .then(data => {
        if (!data.error) {
          dispatch(exportEventSuccess())
        }
        else {
          dispatch(exportEventFailure({error: data.error}))
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
        if (!data.error) {
          dispatch(authSuccess({user: data.user}))
        }
        else {
          dispatch(authFailure({error: data.error}))
        }
      })
  }
}

export const reducer = handleActions({
  GET_EVENTS_REQUEST: (state, action) => ({...state}),
  GET_EVENTS_SUCCESS: (state, action) => ({...state, list: action.payload.events}),
  GET_EVENTS_FAILURE: (state, action) => ({...state, error: action.payload.error}),
  CREATE_EVENT_REQUEST: (state, action) => ({...state}),
  CREATE_EVENT_FAILURE: (state, action) => ({...state, error: action.payload.error}),
  CREATE_EVENT_SUCCESS: (state, action) => {
    return ({...state, list: [...state.list, action.payload.event]})
  },
  DELETE_EVENT_REQUEST: (state, action) => ({...state}),
  DELETE_EVENT_FAILURE: (state, action) => ({...state, error: action.payload.error}),
  DELETE_EVENT_SUCCESS: (state, action) => {
    return ({...state, list: state.list.filter(event => event._id !== action.payload.id)})
  },
  EXPORT_EVENT_REQUEST: (state, action) => ({...state}),
  EXPORT_EVENT_SUCCESS: (state, action) => ({...state}),
  EXPORT_EVENT_FAILURE: (state, action) => ({...state}),
  AUTH_REQUEST: (state, action) => ({...state}),
  AUTH_FAILURE: (state, action) => ({...state, error: action.payload.error}),
  AUTH_SUCCESS: (state, action) => ({...state, user: action.payload.user}),
  REGISTER_REQUEST: (state, action) => ({...state}),
  REGISTER_FAILURE: (state, action) => ({...state, error: action.payload.error}),
  REGISTER_SUCCESS: (state, action) => ({...state, user: action.payload.user}),
}, defaultState)

const getLeftTime = (list) => list.filter(item => item.start >= 0 && item.start < 300)
const getRightTime = (list) => list.filter(item => (item.start >= 300 && item.start <= 560) || (item.start < 320 && (item.start + item.duration) > 300))

const hasSamePlace = (first, second) => {
  return !((first.y <= second.x) || (first.x >= second.y))
}
const getCoords = ({start, duration}) => ({x: start, y: start + duration})

const calculateEvents = (events) => {
  return events.map(item => {
      const count = _.filter(events, itemToCompare => {
          return hasSamePlace(getCoords(item), getCoords(itemToCompare))
        }
      )

      const offset = _.findIndex(count, itemToCompare => itemToCompare._id === item._id)

      return {
        ...item,
        offset,
        width: count.length > 4 ? count.length / 2 : count.length,
      }
    }
  )
}

const optimizeRightTime = (events) => events.map(item => ({...item, start: item.start - 300, original: item.start}))

export const getAllEvents = (state) => state.events.list
export const getFormattedEvents = createSelector(
  [getAllEvents],
  (list) => ({left: getLeftTime(calculateEvents(list)), right: optimizeRightTime(getRightTime(calculateEvents(list)))})
)
export const getUser = (state) => state.events.user
export const isLoggedIn = (state) => state.events.user && state.events.user._id