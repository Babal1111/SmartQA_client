import { useState } from "react";
import { serverEndpoint } from "../config/appConfig";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function CreateRoom({userDetails}){
    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [errors,setErrors] = useState({});
    const [keywords,setKeywords] = useState("null");
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
                createdBy:name,
                keywords:keywords
            },{withCredentials:true});
            const roomCode = response.data.roomCode;
            navigate(`/room/${roomCode}`);
        }
    }
    return(
        <div className="container text=center py-5">
            <h2 className="mb-4">  Create Room (logged in user: {userDetails?.name || "Guest"})   </h2>
            <div className="row">
                <div className="col-md-5">
                    <div className=" mb-3"> 
                        <label htmlFor="name">Full name:</label>
                        <input type="text" id="name" name="name"
                        className={errors.name? "form-control is-invalid": "form-control"} 
                        value={name} onChange={(e)=>setName(e.target.value)} />
                        <div className="invalid feedback">{errors.name}</div>
                        <br></br>
                        <label htmlFor="name">Keywords:</label>
                        <input type="text" id="keywords" name="keywords"
                        className={errors.keywords? "form-control is-invalid": "form-control"} placeholder="Enter keywords seperated by comma"
                        value={keywords} onChange={(e)=>setKeywords(e.target.value)} />
                        <div className="invalid feedback">{errors.keywords}</div>
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