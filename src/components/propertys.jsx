import React from 'react'

export default function propertys(props) {
  return (
    <div className='card'>
      <h1>HELLO MY CAR {props.carModel} and the color is {props.carColor}</h1>
      {props.brand && <h1>MY CAR IS A {props.brand}</h1>}
    </div>
  )
}

