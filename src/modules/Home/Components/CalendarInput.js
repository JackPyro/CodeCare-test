import React, { Component } from 'react'
import styled from 'styled-components'
import { Form, Field } from 'react-final-form'
import renderInput from '../../Shared/Forms/input'

class CalendarForm extends Component {
  submit = (values) => {
    alert(JSON.stringify(values))
  }

  validate = (values) => {

  }

  renderForm = ({handleSubmit, reset, submitting, pristine, values}) => (
    <form onSubmit={handleSubmit}>
      <Field label="Text" name="text">
        {renderInput}
      </Field>
    </form> )

  render () {
    return (
      <Wrapper>
        <Form onSubmit={this.submit}
              render={this.renderForm}
        />
      </Wrapper>
    )
  }
}

export default CalendarForm

const Wrapper = styled.div``