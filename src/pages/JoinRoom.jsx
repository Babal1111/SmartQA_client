import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverEndpoint } from "../config/appConfig";
import { useDispatch } from "react-redux";
import { SET_USER } from "../redux/user/action";
import axios from "axios";

function JoinRoom() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [errors, setErrors] = useState({});
    const [roomCode, setRoomCode] = useState("");
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const isValid = () => {
        let isValid = true;
        const newErrors = {};
        
        if (name.length < 2) {
            isValid = false;
            newErrors.name = "Name must be at least 2 characters long";
        }
        
        if (!roomCode) {
            isValid = false;
            newErrors.roomCode = "Please enter room code";
        }
        
        setErrors(newErrors);
        return isValid;
    }

    const handleSubmit = async () => {
        if (isValid()) {
            setIsLoading(true);
            try {
                const response = await axios.post(
                    `${serverEndpoint}/room/${roomCode}/joinRoom`,
                    { name: name },
                    { withCredentials: true }
                );

                dispatch({
                    type: SET_USER,
                    payload: response.data.userDetails
                });

                navigate(`/room/${roomCode}`);
            } catch (error) {
                console.log(error);
                setErrors({
                    message: error.response?.data?.message || 
                            "Failed to join room. Please try again."
                });
            } finally {
                setIsLoading(false);
            }
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Join a Room
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Enter the room code provided by your host
                    </p>
                </div>

                {/* Error Message */}
                {errors.message && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{errors.message}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Your Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={`appearance-none block w-full px-3 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                />
                                {errors.name && (
                                    <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="roomCode" className="block text-sm font-medium text-gray-700">
                                Room Code
                            </label>
                            <div className="mt-1">
                                <input
                                    id="roomCode"
                                    name="roomCode"
                                    type="text"
                                    required
                                    value={roomCode}
                                    onChange={(e) => setRoomCode(e.target.value)}
                                    className={`appearance-none block w-full px-3 py-2 border ${errors.roomCode ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                />
                                {errors.roomCode && (
                                    <p className="mt-2 text-sm text-red-600">{errors.roomCode}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Joining...
                                    </>
                                ) : 'Join Room'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    Need to create a room instead?
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <a
                                href="/create"
                                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Create New Room
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JoinRoom;