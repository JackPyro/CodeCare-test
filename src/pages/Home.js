import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import { connect } from 'react-redux'
import { getEvents, getFormattedEvents, createEvent } from '../redux/events'
import CalendarWrap from '../modules/Home/Components/CalendarWrap'
import CalendarInput from '../modules/Home/Components/CalendarInput'

@connect(
  state => ({
    events: getFormattedEvents(state),
  }),
  {getEvents, createEvent}
)
class Home extends Component {
  componentWillMount () {
    const {getEvents} = this.props
    getEvents()
  }

  submitEvent = (event) => {
    const {createEvent} = this.props
    console.log(this.props)
    console.log(event)
    createEvent(event)
  }

  render () {
    const {events} = this.props
    return (
      <HomeWrapper>
        <Title>Calendar using MERN Stack</Title>
        <SideWrap>
          <CalendarWrap events={events}/>
          <CalendarInput submitEvent={this.submitEvent}/>
        </SideWrap>
      </HomeWrapper>
    )
  }
}

export default Home

const HomeWrapper = styled.div`

`

const SideWrap = styled.div`
  display: flex;
`

const Title = styled.h3`
    border-bottom: 1px solid #262626;
    color: #262626;
    padding-bottom: 5px;
    `