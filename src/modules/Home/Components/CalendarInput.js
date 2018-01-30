import React, { Component } from 'react'
import styled from 'styled-components'
import { Form, Field } from 'react-final-form'
import { FORM_ERROR } from 'final-form'
import renderInput from '../../Shared/Forms/input'

const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)
const required = value => (value ? undefined : 'Required')
const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined)

const Fields = [
  {name: 'event', label: 'Event', validate: required},
  {name: 'timeFrom', label: 'Time From', validate: composeValidators(required, mustBeNumber)},
  {name: 'timeTo', label: 'Time To', validate: composeValidators(required, mustBeNumber)},
]
class CalendarForm extends Component {
  submit = (values) => {
    const {timeFrom, timeTo, event} = values
    if (timeTo < timeFrom) {
      return {
        [FORM_ERROR]: `Validation error: Time To can be bigger than Time From`
      }
    }
    else {
      alert(JSON.stringify(values))
    }
  }

  renderForm = ({handleSubmit, reset, submitting, pristine, values, submitError}) => (
    <form onSubmit={handleSubmit}>
      {Fields.map(field => (
        <Field validate={field.validate} key={'field_' + field.name} label={field.label} name={field.name}>
          {renderInput}
        </Field>
      ))}
      <button> Submit</button>
      {submitError && <SubmitError>{submitError}</SubmitError>}
    </form> )

  render () {
    return (
      <Wrapper>
        <h2>Add new event</h2>
        <Form onSubmit={this.submit}
              render={this.renderForm}
        />
      </Wrapper>
    )
  }
}

export default CalendarForm

const Wrapper = styled.div`
  width:100%;
  padding: 0px 15px;
  background-color: rgba(0,0,0,0.05);
`

const StyledForm = styled.form`

`

const Labels = styled.span`
  font-weight: bold;
`

const SubmitError = styled.div`
  color: white;
  margin: 20px 0px;
  background-color: #db2525;
  padding: 10px;
`