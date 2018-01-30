import React from 'react'
import styled from 'styled-components'

const renderInput = ({input, meta, name, label = ''}) => (
  <div>
    <label>{label}</label>
    <input {...input} type="text" placeholder={label || 'Enter value...'}/>
    {meta.error && meta.touched && <span>{meta.error}</span>}
  </div>
)

export default renderInput