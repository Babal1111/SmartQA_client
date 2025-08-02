import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {serverEndpoint} from "../config/appConfig";
import { useDispatch } from "react-redux";
import { SET_USER } from "../redux/user/action";
import axios from "axios";

function JoinRoom(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [errors,setErrors] = useState({});
    const [roomCode,setRoomCode] = useState("");
    const [name,setName] = useState("");

    const isValid=()=>{
        let isValid=true;
        const newErrors = {};
        if(name.length ===0){
            isValid = false;
            newErrors.name = "Name must be at least 2 characters long";
        }
        if(!roomCode){
            isValid = false;
            newErrors.roomCode="Please enter room code";
        }
        setErrors(newErrors);
        
        return isValid;
    }

    const handleSubmit=async()=>{
        if(isValid()){
            // localStorage.setItem("participant-name",name);
            // console.log("navigating to room.jsx");

        try {
         const response = await axios.post(`${serverEndpoint}/room/${roomCode}/joinRoom`,{
            name:name
         },{withCredentials: true});

         dispatch({
            type: SET_USER,
            payload: response.data.userDetails
         })
        updateUserDetails(response.data);
        } catch (error) {
            console.log(error);
            
        }
          navigate(`/room/${roomCode}`);
        }
        // well check if this is valid roomCode or not in Room.jsx when we get it through params not here
    }
    return(
        <div className="container text=center py-5">
            <h2 className="mb-4">Join Room</h2>
            <div className="row">
                <div className="col-md-5">
                    <div className=" mb-3"> 
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name"
                        className={errors.name? "form-control is-invalid": "form-control"} 
                        value={name} onChange={(e)=>setName(e.target.value)} />
                        <div className="invalid feedback">{errors.name}</div> 
                        {/* store this name in local storage from where we can access it again in question compo */}
                        <br></br>
                        <label htmlFor="roomCode">Room code:</label>
                        <input type="text" id="roomCode" name="roomCode"
                        className={errors.roomCode? "form-control is-invalid": "form-control"} 
                        value={roomCode} onChange={(e)=>setRoomCode(e.target.value)} />
                        <div className="invalid feedback">{errors.roomCode}</div>
                    </div>
                    <div className="mb-3">
                        <button type="submit" onClick={()=>handleSubmit()} className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>

        </div> 
    )
}

export default JoinRoom;