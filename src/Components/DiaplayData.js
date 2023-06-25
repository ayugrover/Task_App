import React,{useState,useEffect} from 'react';
import axios from 'axios';

function DiaplayData() {
  const[userDet, setUserDet] = useState([]);
  const apiURL = 'https://reqres.in/api/users?page=1&per_page=5'
  useEffect(()=>{
    axios.get(apiURL).then(res=>{
      console.log(res)
    }).catch((e)=>{
      console.log(e)
    })
  },[])

  return (
    <div>
      
    </div>
  )
}

export default DiaplayData