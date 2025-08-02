import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Home() {
  const userDetails = useSelector((state)=>state.userDetails); 

    console.log(userDetails);
    useEffect(() => {
    console.log('userDetails changed in Home', userDetails);
  }, [userDetails]);

  return (
    <div className="container text-center py-5">
      <h2 className="mb-4">Smart QA Get Started</h2>
      <p className="lead mb-3">Get started with Smart QA and discover the power of</p>

      {userDetails ? (
        <div className="mb-3">Welcome, {userDetails.name}!</div>
      ) : (
        <div className="mb-3">You are not logged in.</div>
      )}

      <p className="mb-4">
        If you are a participant, click on join room.<br />
        Ask for room code from the host of the meeting.
      </p>

      <Link to="/create" className="btn btn-primary mx-3">Create Room</Link>
      <Link to="/join" className="btn btn-success mx-3">Join Room</Link>
    </div>
  );
}

export default Home;
