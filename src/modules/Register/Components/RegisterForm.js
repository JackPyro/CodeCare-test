import React, { Component } from 'react'
import styled from 'styled-components'
import { Form, Field } from 'react-final-form'
import renderInput from '../../Shared/Forms/input'
import renderPassword from '../../Shared/Forms/password'
import {
  required,
} from '../../Shared/Forms/validators'

class CalendarForm extends Component {
  submit = (values) => {
    this.props.submit(values)
  }

  renderForm = ({handleSubmit, reset, submitting, pristine, values, submitError}) => (
    <StyledForm onSubmit={handleSubmit}>
      <Field validate={required} label={'Login'} name={'username'}>
        {renderInput}
      </Field>
      <Field validate={required} label={'Password'} name={'password'}>
        {renderPassword}
      </Field>
      <SubmitButton> Submit</SubmitButton>
    </StyledForm> )

  render () {
    const {submitError} = this.props
    return (
      <Wrapper>
        <Title>Registration</Title>
        <Form onSubmit={this.submit}
              render={this.renderForm}
        />
        {submitError && <SubmitError>{submitError}</SubmitError>}
      </Wrapper>
    )
  }
}

export default CalendarForm

const SubmitButton = styled.button`
    border: none;
    background-color: #6E9ECF;
    padding: 5px 25px;
    margin: 0px auto;
    margin-bottom: 20px;
`

const Title = styled.h2`
  text-align: center;
`

const Wrapper = styled.div`
  width:500px;
  padding: 0px 15px;
  background-color: rgba(0,0,0,0.05);
`

const StyledForm = styled.form`
  text-align: center;
`

const TimeWrap = styled.div`
  display: flex;
  justify-content: space-between;
`

const Label = styled.span`
  font-weight: bold;
`

const SubmitError = styled.div`
  color: white;
  margin: 20px 0px;
  background-color: #db2525;
  padding: 10px;
`