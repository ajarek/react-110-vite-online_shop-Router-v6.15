import React, { useContext, useState } from 'react'
import { AppContext } from '../../App'
import { FaPlus, FaMinus } from 'react-icons/fa'

import './Counter.css'
const Counter = () => {
  const  [count, setCount]  = useState(1)
  return (
    <div className='counter'>
      <button onClick={() => setCount((count) => (count <= 1 ? 1 : count - 1))}>
        <FaMinus />
      </button>
      <div className='count'>{count}</div>
      <button onClick={() => setCount((count) => count + 1)}>
        <FaPlus />
      </button>
    </div>
  )
}

export default Counter
