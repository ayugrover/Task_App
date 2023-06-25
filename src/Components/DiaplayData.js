import React,{useState,useEffect, useReducer} from 'react';
import axios from 'axios';
import './DisplayData.css'
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';

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
        userData: action.data.data,
        total: action.data.total_pages
       };
    case "GET_DATA":
      {
       let index = state.userData.findIndex(ele => ele.id === action.id)
      if(index != -1)
        return {...state,
        user: state.userData[index]
        }
      }
    default:
      return state;
  }
};

function DiaplayData() {
  const [userDet, dispatch] = useReducer(reducer, initialData);
  const navigate = useNavigate();
  const apiURL = 'https://reqres.in/api/users?'

  const pageCount = userDet.userData ? userDet.total : 0;

  const handlePageClick = (event) => {
    axios.get(apiURL+`page=${event.selected+1}&per_page=${6}`).then(res=>{
      dispatch({ type: "SET_DATA", data : res.data});
    })
  }

  useEffect(()=>{
    axios.get(apiURL+ `page=${1}&per_page=${6}`).then(res=>{
       dispatch({ type: "SET_DATA", data : res.data});
    }).catch((e)=>{
      console.log(e)
    })
  },[])

  const onHandleClick = (Id, user) =>{
    dispatch({ type: "GET_DATA", id : Id});
    navigate(`/DisplayData/${Id}`, {state:{user: user}})
  }

  console.log(userDet)

  return (
    <div>
      <h2>Users List</h2>
      <br/>
      <div>
        <table>
          <tr>
            <th>User Id</th>
            <th>Full Name</th> 
          </tr>
          {
            userDet.userData && userDet.userData.length>0&&
              userDet.userData.map(user=>(
                <tr onClick={()=>onHandleClick(user.id, user)} key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    {user.first_name + ' ' + user.last_name}
                  </td>
                </tr>
              ))
            }
        </table>
        <br/>
        <div className='pageWrap'> 
          <ReactPaginate
          breakLabel="..."
          nextLabel="next>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<prev"
          renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </div>
  )
}

export default DiaplayData