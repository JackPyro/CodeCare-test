import React, { Component } from 'react'
import styled from 'styled-components'

class CalendarItem extends Component {

  render () {
    const {event} = this.props
    return (
      <Wrapper>
        {JSON.stringify(event)}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  display: flex;
  margin-top: 10px;
`

const Row = styled.div`
  position: relative;
  width: 240px;
  margin-right: 20px;
`

const Border = styled.div`
  height: 1px;
  border-top: 1px solid #b9b9b9;
  padding-top: 1px;
`

const Time = styled.div`
  font-size: ${props => props.small ? '12px' : '16px'};
  flex: 0 0 20px;
  width: 40px;
  text-align: center;
  color: #b9b9b9;
  height: 20px;
`

const TimeWrap = styled.div`
  height:50px;
`

const Entry = styled.div`
  position: absolute;
  top: ${({time}) => time > 20 ? (time * 50 / 30) : time}px; 
  left: 40px;
  width: ${({width}) => width ? 200 / width : 200}px;
  background-color: #E2ECF5;
  font-size: 14px;
  height: ${({duration, time}) => duration ? (50 * duration / 30) : 14}px;
  border-left: 2px solid #6E9ECF;
  margin-left: ${({offset, width}) => offset ? offset * (200 / width) : 0}px;
`

const Label = styled.div`
  padding: 4px;
`

export default CalendarItem