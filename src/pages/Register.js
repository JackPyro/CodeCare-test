import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import { connect } from 'react-redux'
import { isLoggedIn, registerUser } from '../redux/events'
import RegisterForm from '../modules/Register/Components/RegisterForm'
import { Link, Redirect } from 'react-router-dom'

@connect(
  state => ({
    isLoggedIn: isLoggedIn(state),
  }),
  {registerUser}
)
class Register extends Component {
  submit = (user) => {
    const {registerUser} = this.props
    registerUser(user)
  }

  render () {
    const {isLoggedIn} = this.props
    return (
      <RegisterWrapper>
        {isLoggedIn && <Redirect to="/"/>}
        <Title>Register Page</Title>
        <RegisterForm submit={this.submit}/>
        <Link to="/login">Login</Link>
      </RegisterWrapper>
    )
  }
}

export default Register

const RegisterWrapper = styled.div`
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