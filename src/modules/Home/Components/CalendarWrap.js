import React, { Component } from 'react'
import styled from 'styled-components'

class CalendarWrap extends Component {

  isSmall = (index) => index % 2 !== 0

  render () {
    const first_row = ['8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30']
    const second_row = ['1:00', '1:30', '2:00', '2:30', '3:00', '3:30', '4:00', '4:30', '5:00']
    return (
      <Wrapper>
        <Row>
          {first_row.map((time, index) =>
            <div key={time}>
              {!this.isSmall(index) && <Border/>}
              <Time small={this.isSmall(index)}>{time}</Time>

            </div>
          )}
          <Entry time={0} duration={40} width={3} offset={0}><Label>Text</Label></Entry>
          <Entry time={0} duration={35} width={3} offset={1}><Label>Text2</Label></Entry>
          <Entry time={0} duration={35} width={3} offset={2}><Label>Text2</Label></Entry>
        </Row>
        <Row>
          {second_row.map((time, index) =>
            <div key={time}>
              {!this.isSmall(index) && <Border/>}
              <Time small={this.isSmall(index)}>{time}</Time>
            </div>
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
  width: 240px;
  margin-right: 20px;
`

const Border = styled.div`
  height: 1px;
  border-top: 1px solid #b9b9b9;
`

const Time = styled.div`
  font-size: ${props => props.small ? '12px' : '16px'};
  margin-bottom: 17px;
  flex: 0 0 20px;
  width: 40px;
  text-align: center;
  color: #b9b9b9;
`

const Entry = styled.div`
  position: absolute;
  top: ${props => props.time}px; 
  left: 40px;
  width: ${props => 200 / props.width}px;
  background-color: #E2ECF5;
  font-size: 14px;
  height: ${props => props.duration}px;
  border-left: 2px solid #6E9ECF;
  margin-left: ${props => props.offset * (200 / props.width)}px;
`

const Label = styled.div`
  padding: 4px;
`

export default CalendarWrap