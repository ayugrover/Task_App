import React,{useState,useEffect, useReducer} from 'react';
import axios from 'axios';

const initialTodos = [
  {
    id: 1,
    title: "Todo 1",
    complete: false,
  },
  {
    id: 2,
    title: "Todo 2",
    complete: false,
  },
]

const reducer = (state, action) => {
  switch (action.type) {
    case "COMPLETE":
      return state.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, complete: !todo.complete };
        } else {
          return todo;
        }
      });
    default:
      return state;
  }
};

function DiaplayData() {
  const[userDet, setUserDet] = useState([]);
  const [todos, dispatch] = useReducer(reducer, initialTodos);
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