import React from 'react'
import styled, { keyframes } from 'styled-components'
import CalendarWrap from '../modules/Home/Components/CalendarWrap'
import CalendarInput from '../modules/Home/Components/CalendarInput'

const Home = () => (
  <HomeWrapper>
    <Title>Calendar using MERN Stack</Title>
    <SideWrap>
      <CalendarWrap/>
      <CalendarInput/>
    </SideWrap>
  </HomeWrapper>
)

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