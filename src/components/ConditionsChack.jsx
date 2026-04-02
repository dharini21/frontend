import React from 'react'
function Hello() {
  return (
    <div>
      <h1>HELLO THIS IS SRI DHARINI</h1>
    </div>
  )
}


 function Bye() {
  return (
    <div>
      <h1>BYE THANKS YOU...!</h1>
    </div>
  )
}


export default function ConditionsChack(props) {
    const content =props.content
    if(content){
        return <Hello/>
    }
    {
        return <Bye/>
    }
}
