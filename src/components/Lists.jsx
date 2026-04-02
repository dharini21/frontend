import React from 'react'

export default function Lists() {
    const cars =['Ford', 'BMW', 'Audi']
  return (
    <div className='card'>
      <h1>CARS</h1>
      <ul>{cars.map((car,index) => <li key={index}>I AM A {car}</li>)}</ul>
    </div>
  )
}
