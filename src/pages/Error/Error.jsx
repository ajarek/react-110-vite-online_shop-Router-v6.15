import React from 'react'
import { useRouteError, Link, useNavigate } from 'react-router-dom'
import './Error.css'
const Error = () => {
  const error = useRouteError()
  const navigate = useNavigate()
  return (
    <div className='error'>
      <h1>Oh oh! We have a problem.</h1>
      <p>{error.message || error.statusText}</p>
      <div>
        <button
          className='btn btn-dark'
          onClick={() => navigate(-1)}
          style={{
            border: '2px solid violet',
            marginTop: '1rem',
            marginBottom: '1rem',
            padding: '0 1rem',
            fontSize: '1.3rem',
            cursor: 'pointer',
            fontWeight: '500',
          }}
        >
          <span>Go Back 🔙</span>
        </button>
        <br />
        <Link
          to='/'
          className='link'
          style={{
            border: '2px solid black',
            fontSize: '1.3rem',
            fontWeight: '500',
            marginTop: '1rem',
            padding: '0 1rem',
            textDecoration: 'none',
            color: 'black',
          }}
        >
          <span>Go Home 🏠</span>
        </Link>
      </div>
    </div>
  )
}

export default Error
