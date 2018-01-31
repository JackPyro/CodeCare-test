import React, { Component } from 'react'
import styled from 'styled-components'
import { Form, Field } from 'react-final-form'
import { FORM_ERROR } from 'final-form'
import renderInput from '../../Shared/Forms/input'
import renderTimeInput from '../../Shared/Forms/time'
import {
  composeValidators,
  required,
  mustBeNumber,
  validHour,
  validMinute,
  validTime,
  getValidTime
} from '../../Shared/Forms/validators'

class CalendarForm extends Component {
  submit = (values) => {
    const {title, timeFromHours, timeFromMinutes, timeToHours, timeToMinutes,} = values
    const tFH = parseInt(timeFromHours)
    const tFM = parseInt(timeFromMinutes)
    const tTH = parseInt(timeToHours)
    const tTM = parseInt(timeToMinutes)

    const start = getValidTime(tFH, tFM)
    const end = getValidTime(tTH, tTM)
    const diff = end - start
    if (diff < 0) {
      return {[FORM_ERROR]: 'Validation error: Time To can be bigger than Time From'}
    }
    else {

      const event = {
        title,
        start: (
          tFH < 6
            ? ((tFH + 4) * 60) + tFM
            : ((tFH - 8) * 60) + tFM
        ),
        duration: (
          tTH < 6
            ? (((tTH + 12) - tFH) * 60) + (tTM - tFM)
            : (((tTH - tFH) * 60) + (tTM - tFM))
        ),
        startTime: `${tFH}:${tFM < 10 ? '0' + tFM : tFM}`,
        endTime: `${tTH}:${tTM < 10 ? '0' + tTM : tTM}`
      }
      this.props.submitEvent(event)
    }
  }

  renderForm = ({handleSubmit, reset, submitting, pristine, values, submitError}) => (
    <form onSubmit={handleSubmit}>
      <Field validate={required} label={'Event Title'} name={'title'}>
        {renderInput}
      </Field>
      <Label> Time From </Label>
      <TimeWrap>
        <Field
          label={'Enter hours'}
          validate={composeValidators(required, mustBeNumber, validHour)}
          name={'timeFromHours'}>
          {renderTimeInput}
        </Field>
        <Field
          label={'Enter minutes'}
          validate={composeValidators(required, mustBeNumber, validMinute)}
          name={'timeFromMinutes'}>
          {renderTimeInput}
        </Field>
      </TimeWrap>
      <Label> Time To </Label>
      <TimeWrap>
        <Field
          label={'Enter hours'}
          validate={composeValidators(required, mustBeNumber, validHour)}
          name={'timeToHours'}>
          {renderTimeInput}
        </Field>
        <Field
          label={'Enter minutes'}
          validate={composeValidators(required, mustBeNumber, validMinute)}
          name={'timeToMinutes'}>
          {renderTimeInput}
        </Field>
      </TimeWrap>
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