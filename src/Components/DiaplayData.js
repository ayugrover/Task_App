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
  const navigate = useNavigate();
  const apiURL = 'https://reqres.in/api/users?'
  const [itemOffset, setItemOffset] = useState(0);

  const pageCount = userDet.userData ? userDet.userData.total_pages : 0;

  const handlePageClick = (event) => {
    console.log(event)
    axios.get(apiURL+`page=${event.selected+1}&per_page=${6}`).then(res=>{
      console.log(res.data)
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
            userDet.userData && userDet.userData.data.length>0&&
              userDet.userData.data.map(user=>(
                <tr onClick={()=>navigate(`/DisplayData/${user.id}`, {state:{user: user}})} key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    {user.first_name + ' ' + user.last_name}
                  </td>
                </tr>
              ))
            }
        </table>
        <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
      </div>
    </div>
  )
}

export default DiaplayData