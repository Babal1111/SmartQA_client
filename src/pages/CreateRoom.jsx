import { useState } from "react";
import { serverEndpoint } from "../config/appConfig";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function CreateRoom(){
    const navigate = useNavigate();
    const [name,setName] = useState(null);
    const [errors,setErrors] = useState({});

    const validate=()=>{
        const newErrors = {};
        let isValid = true;

        if(name.length ===0){
            isValid = false;
            newErrors.name = "Name is required";
        }
        setErrors(newErrors);
        return isValid;
    }

    const handelSubmit=async()=>{
        if(validate()){
            const response = await axios.post(`${serverEndpoint}/room`,{
                createdBy:name
            },{withCredentials:true});
            const roomCode = response.data.roomCode;
            navigate(`/room/${roomCode}`);
        }
    }
    return(
        <div className="container text=center py-5">
            <h2 className="mb-4">Create Room</h2>
            <div className="row">
                <div className="col-md-5">
                    <div className=" mb-3"> 
                        <label htmlFor="name">Full name:</label>
                        <input type="text" id="name" name="name"
                        className={errors.name? "form-control is-invalid": "form-control"} 
                        value={name} onChange={(e)=>setName(e.target.value)} />
                        <div className="invalid feedback">{errors.name}</div>
                    </div>
                    <div className="mb-3">
                        <button type="submit" onClick={()=>handelSubmit()} className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>

        </div> 
    )
}
export default CreateRoom;