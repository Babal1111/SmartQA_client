import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import CreateRoom from './pages/CreateRoom';
import JoinRoom from './pages/JoinRoom';
import Room from './pages/Room';
import Login from './pages/Login';
import Register from './pages/Register';
import { useState,useEffect } from 'react';
import { serverEndpoint } from "./config/appConfig";
import { useSelector, useDispatch } from 'react-redux';

import axios  from 'axios';
import { SET_USER } from './redux/user/action';

function App() {
  // const [userDetails,updateUserDetails] = useState(null);
  const userDetails = useSelector((state)=>state.userDetails);
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(true);
const isUserLoggedIn = async()=>{
  // const token = localStorage.getItem('token');

  try {
    // const cookie = await axios.get('http://localhost:5000/check-cookie', { withCredentials: true });
    // console.log("Cookie:" ,cookie);
    console.log("before is user Logged in call");
    const response = await axios.post(`${serverEndpoint}/auth/is-user-logged-in`,{},{
        withCredentials: true
      });  
      console.log("after is user Logged in call");
      dispatch({
        type: SET_USER,
        payload:response.data.userDetails
      });
    // updateUserDetails(response.data.userDetails);
    console.log(userDetails);
    console.log("user is logged in !!");
  } catch (error) {
    console.log("user Not Logged in");
  }finally{
    setLoading(false);
  }

}
  useEffect(() => {
    isUserLoggedIn(); 
  }, []);

// console.log("userDetails from App.jsx:", userDetails);    
  if (loading) return <h2>Loading...</h2>;

  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={ <Home/>}/>
        <Route path="/create" element={<CreateRoom/>}/>
        <Route path="/join" element={ <JoinRoom/>}/>
        <Route path="/room/:code" element={ <Room/>}/>
        
        
      </Routes> 
      
    </>
  )
}

export default App
