import React from 'react'

function Events() {
    const shoot=()=>{
        alert("hello this is sri dharini")
    }
  return (
    <div className='card'>
      <button onClick={shoot}>Alert Notification</button>
    </div>
  )
}

export default Events;
