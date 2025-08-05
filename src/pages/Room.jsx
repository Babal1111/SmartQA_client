import { useEffect } from "react";
import Question from "./Question";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { serverEndpoint } from "../config/appConfig";
import { io } from 'socket.io-client';
import { useSelector } from "react-redux";

function Room() {
    const userDetails = useSelector((state) => state.userDetails);
    const { code } = useParams();
    const [loading, setLoading] = useState(true);
    const [room, setRoom] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [errors, setErrors] = useState({});
    const [summaries, setSummaries] = useState([]);
    const [isFetchingSummary, setIsFetchingSummary] = useState(false);

    const fetchSummary = async () => {
        setIsFetchingSummary(true);
        try {
            const response = await axios.get(`${serverEndpoint}/room/${code}/summary`, { withCredentials: true });
            setSummaries(response.data || []);
        } catch (error) {
            console.error(error);
            setErrors({ message: 'Unable to fetch question summaries. Please try again later.' });
        } finally {
            setIsFetchingSummary(false);
        }
    }

    const fetchRoom = async () => {
        try {
            const response = await axios.get(`${serverEndpoint}/room/${code}`, {
                withCredentials: true
            });
            setRoom(response.data);
        } catch (error) {
            console.error(error);
            setErrors({ message: 'Unable to fetch room details. Please try again later.' });
        }
    }

    const fetchQuestions = async () => {
        try {
            const response = await axios.get(`${serverEndpoint}/room/${code}/question`, { withCredentials: true });
            setQuestions(response.data);
        } catch (error) {
            console.error(error);
            setErrors({ message: 'Unable to fetch questions. Please try again later.' });
        }
    }

    useEffect(() => {
        const socket = io(serverEndpoint);
        const fetchData = async () => {
            await fetchQuestions();
            await fetchRoom();
            setLoading(false);
        }

        fetchData();
        socket.emit("join-room", code);
        socket.on("new-question", (question) => {
            setQuestions((prev) => [question, ...prev]);
        });

        return () => {
            socket.off("new-question");
        };
    }, [code]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (errors.message) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-md">
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
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Room: <span className="text-indigo-600">{code}</span>
                        </h2>
                        <p className="text-gray-600 mt-1">
                            Created by: <span className="font-medium">{userDetails?.name || 'Unknown'}</span>
                            {userDetails?.role && (
                                <span className="ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
                                    {userDetails.role}
                                </span>
                            )}
                        </p>
                    </div>

                    {userDetails?.role === "admin" && (
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">Admin Controls</h3>
                                <p className="text-sm text-gray-500">Get AI-generated summaries of top questions</p>
                            </div>
                            <button
                                onClick={fetchSummary}
                                disabled={isFetchingSummary}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isFetchingSummary ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Generating...
                                    </>
                                ) : 'Get Top Questions'}
                            </button>
                        </div>
                    )}

                    {userDetails?.role === "admin" && summaries.length > 0 && (
                        <div className="px-6 py-4">
                            <h3 className="text-lg font-medium text-gray-900 mb-3">Question Summaries</h3>
                            <div className="space-y-3">
                                {summaries.map((sum, idx) => (
                                    <div key={idx} className="p-3 bg-gray-50 rounded-md border border-gray-200">
                                        <p className="text-gray-800">{sum}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {userDetails?.role === "user" && (
                    <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">Ask a Question</h3>
                        </div>
                        <div className="px-6 py-4">
                            <Question roomCode={code} />
                        </div>
                    </div>
                )}

                {userDetails.role ==="admin" && (<div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">
                           "All Questions" 
                        </h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {questions.length > 0 ? (
                            questions.map((question) => (
                                <div key={question._id} className="px-6 py-4 hover:bg-gray-50">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                            {question.user?.charAt(0)?.toUpperCase() || '?'}
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-gray-900">{question.user || 'Anonymous'}</p>
                                            <p className="text-gray-600 mt-1">{question.content}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="px-6 py-8 text-center">
                                <p className="text-gray-500">No questions yet. Be the first to ask!</p>
                            </div>
                        )}
                    </div>
                </div>)}
            </div>
        </div>
    );
}

export default Room;