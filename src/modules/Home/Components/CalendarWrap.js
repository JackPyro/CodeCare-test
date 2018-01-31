import React, { Component } from 'react'
import styled from 'styled-components'

class CalendarWrap extends Component {
  isSmall = (index) => index % 2 !== 0

  select = (event) => {
    this.props.select(event)
  }

  render () {
    const first_row = ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30']
    const second_row = ['1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00']
    const {events = [], selected = null} = this.props
    return (
      <Wrapper>
        <Row>
          {first_row.map((time, index) =>
            <TimeWrap key={time}>
              {!this.isSmall(index) && <Border/>}
              <Time small={this.isSmall(index)}>{time}</Time>

            </TimeWrap>
          )}
          {events.left.map(event =>
            <Entry onClick={() => this.select(event)}
                   key={event._id}
                   selected={selected && selected._id === event._id}
                   time={event.start}
                   duration={(event.start + event.duration > 300) ? 300 - event.start : event.duration}
                   width={event.width}
                   offset={event.offset}>
              <Label hidden={false}>
                {event.title}
              </Label>
            </Entry>
          )}
        </Row>
        <Row>
          {second_row.map((time, index) =>
            <TimeWrap key={time}>
              {!this.isSmall(index) && <Border/>}
              <Time small={this.isSmall(index)}>{time}</Time>
            </TimeWrap>
          )}
          {events.right.map(event =>
            <Entry onClick={() => this.select(event)}
                   key={event._id}
                   selected={selected && selected._id === event._id}
                   time={event.start <= 0 ? 0 : event.start}
                   duration={event.start <= 0 ? (event.duration - (300 - event.original)) : event.duration}
                   width={event.width}
                   offset={event.offset}>
              <Label
                width={event.width}
                hidden={event.start <= 0}>
                {event.title}
              </Label>
            </Entry>
          )}
        </Row>
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
  width: 250px;
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
  left: 50px;
  width: ${({width}) => width ? (200 / width) : 200}px;
  background-color: ${({selected}) => selected ? '#647ef5' : '#E2ECF5' };
  font-size: 14px;
  height: ${({duration}) => duration ? (50 * duration / 30) : 14}px;
  border-left: 2px solid #6E9ECF;
  margin-left: ${({offset, width}) => offset ? offset * (200 / width) : 0}px;
`

const Label = styled.div`
  display: ${props => props.hidden ? 'none' : 'block'};
  padding: 4px;
  width: ${({width}) => width ? (200 / width - 20) + 'px' : 'auto' };
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export default CalendarWrap