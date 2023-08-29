import React from 'react'
import './ErrorMessage.css'

export const ErrorMessage = ({ error }) => {
  return <div className='error-root'>{error + ' !'}</div>
}
export default ErrorMessage
