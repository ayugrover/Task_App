import React from 'react'
import { useLocation } from 'react-router-dom'
import './DisplayData.css'

function Details() {
  const det = useLocation().state.user;
  console.log(det)
  return (
    <div>
      <h3>Details:</h3>
      <p>
        <span><img src={det.avatar} alt={det.first_name}/></span>
        <br/>
        <span><b>Name: </b>{det.first_name + ' ' + det.last_name}</span>
        <br/>
        <span><b>Email: </b>{det.email}</span>
      </p>
    </div>
  )
}

export default Details