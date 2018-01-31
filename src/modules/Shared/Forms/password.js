import React from 'react'
import styled from 'styled-components'

const renderPassword = ({input, meta, name, label = ''}) => (
  <InputWrap>
    <Label>{label}</Label>
    <Input error={meta.error && meta.touched} {...input} type="password" placeholder={label || 'Enter password...'}/>
    {meta.error && meta.touched && <Error>{meta.error}</Error>}
  </InputWrap>
)

export default renderPassword

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`

const Label = styled.label`
  font-weight: bold;
`

const Input = styled.input`
  border: 1px solid ${({error}) => error ? '#db2525' : '#6E9ECF' };
  padding: 4px;
  margin: 5px 0px;
`

const Error = styled.span`
  color: #db2525;
`