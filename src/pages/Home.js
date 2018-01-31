import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import { connect } from 'react-redux'
import {
  getEvents,
  isLoggedIn,
  getFormattedEvents,
  createEvent,
  getUser,
  deleteEvent,
  exportEvents
} from '../redux/events'
import CalendarWrap from '../modules/Home/Components/CalendarWrap'
import CalendarInput from '../modules/Home/Components/CalendarInput'
import CalendarItem from '../modules/Home/Components/CalendarItem'
import ItemOptions from '../modules/Home/Components/ItemOptions'

@connect(
  state => ({
    events: getFormattedEvents(state),
    user: getUser(state),
    isLogged: isLoggedIn(state),
  }),
  {getEvents, createEvent, deleteEvent, exportEvents}
)
class Home extends Component {
  constructor () {
    super()
    this.state = {selected: null}
  }

  componentWillMount () {
    const {getEvents, isLogged, history} = this.props
    if (isLogged) {
      getEvents()
    } else {
      history.push('/login')
    }
  }

  deleteEvent = (id) => {
    this.props.deleteEvent(id)
  }

  exportEvents = () => {
    this.props.exportEvents()
  }

  select = (event) => {
    this.setState({selected: event})
  }

  submitEvent = (event) => {
    const {createEvent, user} = this.props
    createEvent(event, user._id)
  }

  render () {
    const {events} = this.props
    const {selected} = this.state
    return (
      <HomeWrapper>
        <Title>Calendar using MERN Stack</Title>
        <SideWrap>
          <CalendarWrap events={events} select={this.select} selected={selected}/>
          <RightSide>
            <ItemOptions
              selected={selected}
              select={this.select}
              deleteEvent={this.deleteEvent}
              exportEvents={this.exportEvents}
            />
            {selected && selected._id
              ? <CalendarItem event={selected}/>
              : <CalendarInput submitEvent={this.submitEvent}/>
            }
          </RightSide>
        </SideWrap>
      </HomeWrapper>
    )
  }
}

export default Home

const HomeWrapper = styled.div`

`

const RightSide = styled.div`
  width: 100%;
`

const SideWrap = styled.div`
  display: flex;
`

const Title = styled.h3`
    border-bottom: 1px solid #262626;
    color: #262626;
    padding-bottom: 5px;
    `