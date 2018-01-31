import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import { connect } from 'react-redux'
import { getEvents, isLoggedIn, getFormattedEvents, createEvent, getUser } from '../redux/events'
import CalendarWrap from '../modules/Home/Components/CalendarWrap'
import CalendarInput from '../modules/Home/Components/CalendarInput'
import CalendarItem from '../modules/Home/Components/CalendarItem'

@connect(
  state => ({
    events: getFormattedEvents(state),
    user: getUser(state),
    isLogged: isLoggedIn(state),
  }),
  {getEvents, createEvent}
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
          {selected && selected._id
            ? <CalendarItem event={selected}/>
            : <CalendarInput submitEvent={this.submitEvent}/>
          }

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