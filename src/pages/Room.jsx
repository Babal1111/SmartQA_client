import { useEffect } from "react";
import Question from "./Question";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { serverEndpoint } from "../config/appConfig";
import socket from "../config/socket";
function Room(){
    const { code } = useParams(); // code we have define in app.js, in routes it should be same
    const [loading,setLoading] = useState(true); // by default true, as hame initialy load to krna hi h, to get room details
    const [room,setRoom] = useState(null);
    const [questions,setQuestions] = useState([]);
    const [errors,setErrors] = useState({});
    // we ant to get room details,questions, etc on load so we use useEffect

    const fetchRoom = async()=>{
        try {
            const response = await axios.get(`${serverEndpoint}/room/${code}`,{
                withCredentials:true
            });
            setRoom(response.data);
        } catch (error) {
            console.error(error);
            setErrors({message: 'uable to set room detailt, try again later'})
            
        }
    }

    const fetchQustion = async()=>{
        try {
            const response = await axios.get(`${serverEndpoint}/room/${code}/question`,{withCredentials:true});
            setQuestions(response.data);
            
        } catch (error) {
            console.error(error);
            setErrors({message: 'unable to fetch questions, try again later'})
            
        }
    }

    useEffect(()=>{
        // fetchQustion();
        // fetchRoom();  no as this are async
        const fetchData = async()=>{
            await fetchQustion();
            await fetchRoom();
            setLoading(false);
        }
            console.log("in room.jsx");


        fetchData();
        socket.emit("join-room",code);
        socket.on("new-question", (question)=>{
            setQuestions((prev)=>[question,...prev]);
        })

        return() =>{
            socket.off("new-question");
        }
        // react calls this returned function when the COMPONENT UNMOUNT which can be
        // either due to losing int connection or userr closing the browser window
        // we'll use this to disconnect from new-question event.
    },[]);

    if(loading){
        return <div className="container text-center">Loading Room details...</div>
    }
    if(errors.message){
        return <div className="container text-center">{errors.message}</div>
    }
    console.log("no errors no loading");
    return(
        
       <div className="container py-5">
        {console.log("in return function")}
        <h2>Room {code} created by {room.createdBy}</h2>
        <div className="row">
            <div className="col-auto">
                <ul className="list-group">
                    {questions.map((question)=>(
                        <li key={question._id} className="list-group-items">
                            <h4>{question.content}</h4>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
        <Question roomCode={code}/>
       </div>
    )
}

export default Room;