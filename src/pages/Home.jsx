import { Link } from "react-router-dom";

function Home(){
    return (
        <div className="container text-center py-5">
        <h2 className="mb-4">Smart QA Get Started</h2>
        <p className="lead mb-5">Get started with Smart QA and discover the power of</p>
        <p className="mb-4">
            if you are participant click on join room.
            Ask for room code from the host of the meeting.
        </p>
        <Link to="/create" className="btn btn-primary mx-3">Create Room</Link>
        <Link to="/join" className="btn btn-success mx-3">Join Room</Link>
       </div>

    )
}
export default Home;