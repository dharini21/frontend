import React from 'react'
import { useState } from 'react'

function Count() {
    const [count, setCount] = useState(0)
  return (
    <div className='card'>
      <p>count is: {count}</p>
              <button className='but'onClick={() => setCount(count + 1)}>+1
              </button>
              <button  className='but' onClick={() => setCount(count - 1)}>-1
              </button>
              <button className='but' onClick={() => setCount((0))}>RESET
              </button>
    </div>
  )
}

export default Count
