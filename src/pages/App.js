import React, { Component } from 'react'
import styled from 'styled-components'
import { Route, Link } from 'react-router-dom'
import Header from '../modules/Shared/Components/Header'
import Routes from '../routes'

export default class App extends Component {
  constructor () {
    super()
  }

  render () {
    return (
      <Container>
        <Routes/>
      </Container>
    )
  }
}

const Container = styled.div`
  margin: 0px 150px;
`





