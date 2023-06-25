import React,{useState,useEffect, useReducer} from 'react';
import axios from 'axios';
import './DisplayData.css'

const initialData = [
  {
    "id": 1,
    "email": "george.bluth@reqres.in",
    "first_name": "George",
    "last_name": "Bluth",
    "avatar": "https://reqres.in/img/faces/1-image.jpg"
  },
]

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        userData: action.data,
       };
    case "GET_DATA":
      return state;
    default:
      return state;
  }
};

function DiaplayData() {
  const [userDet, dispatch] = useReducer(reducer, initialData);
 // const [userData, setUserData] = useState([]);

  const apiURL = 'https://reqres.in/api/users?page=1&per_page=5'
  useEffect(()=>{
    axios.get(apiURL).then(res=>{
      console.log(res.data.data)
       dispatch({ type: "SET_DATA", data : res.data.data});
       //dispatch({ type: "GET_DATA"});
       //setUserData(userDet)
       console.log(userDet)
    }).catch((e)=>{
      console.log(e)
    })
  },[])

  return (
    <div>
      <h2>Users List</h2>
      <br/>
      <div>
        <table>
          <tr>
            <th>User Icon</th>
            <th>Full Name</th> 
            <th>Email</th>
          </tr>
          {
            userDet.userData && userDet.userData.length>0 &&
              userDet.userData.map(user=>(
                <tr>
                  <td><img src={user.avatar} alt={user.first_name}/></td>
                  <td key={user.id}>
                    {user.first_name + ' ' + user.last_name}
                  </td>
                  <td>
                   {user.email}
                  </td>
                </tr>
              ))
            }
        </table>
      </div>
    </div>
  )
}

export default DiaplayData