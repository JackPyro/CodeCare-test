import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import { connect } from 'react-redux'
import { isLoggedIn, authUser } from '../redux/events'
import LoginForm from '../modules/Login/Components/LoginForm'
import { Link, Redirect } from 'react-router-dom'


@connect(
  state => ({
    isLoggedIn: isLoggedIn(state),
  }),
  {authUser}
)
class Login extends Component {
  submit = (user) => {
    const {authUser} = this.props
    authUser(user)
  }

  render () {
    const {isLoggedIn} = this.props
    return (
      <LoginWrapper>
        {isLoggedIn && <Redirect to="/"/>}
        <Title>Login Page</Title>
        <LoginForm submit={this.submit}/>
        <Link to="/register">Register</Link>
      </LoginWrapper>
    )
  }
}

export default Login

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
`

const Title = styled.h3`
    border-bottom: 1px solid #262626;
    color: #262626;
    padding-bottom: 5px;
    `