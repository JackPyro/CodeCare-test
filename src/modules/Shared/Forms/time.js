import React from 'react'
import styled from 'styled-components'

const renderTimeInput = ({input, meta, name, label = ''}) => (
  <InputWrap>
    <Input error={meta.error && meta.touched} {...input} type="text" placeholder={label || 'Enter value...'}/>
    {meta.error && meta.touched && <Error>{meta.error}</Error>}
  </InputWrap>
)

export default renderTimeInput

const InputWrap = styled.div`
  margin-bottom: 10px;
`

const Input = styled.input`
  border: 1px solid ${({error}) => error ? '#db2525' : '#6E9ECF' };
  padding: 4px;
  margin: 5px 0px;
`

const Error = styled.span`
  color: #db2525;
  display:block;
`