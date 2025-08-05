import axios from "axios";
import { useState } from "react";
import { serverEndpoint } from "../config/appConfig";

function Question({ roomCode }) {
    const [question, setQuestion] = useState("");
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    function isValid() {
        let valid = true;
        let newErrors = {};

        if (question.length < 1) {
            valid = false;
            newErrors["question"] = "Please enter a question";
        }

        setErrors(newErrors);
        return valid;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (isValid()) {
            setIsSubmitting(true);
            try {
                const participant = localStorage.getItem("participant-name");

                const response = await axios.post(
                    `${serverEndpoint}/room/${roomCode}/question`,
                    {
                        content: question, 
                        user: participant ? participant : "Anonymous"
                    },
                    { withCredentials: true }
                );

                setQuestion("");
                setMessage("Question submitted successfully!");
                setTimeout(() => setMessage(null), 3000);
            } catch (error) {
                console.error("Error posting question:", error);
                setErrors({
                    message: "Error posting question. Please try again."
                });
            } finally {
                setIsSubmitting(false);
            }
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Ask Your Question
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Question
                    </label>
                    <textarea
                        id="question"
                        name="question"
                        rows={3}
                        className={`w-full px-3 py-2 border ${errors.question ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Type your question here..."
                    />
                    {errors.question && (
                        <p className="mt-1 text-sm text-red-600">{errors.question}</p>
                    )}
                </div>

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

                {message && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-green-700">{message}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Submitting...
                            </>
                        ) : 'Submit Question'}
                    </button>
                </div>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
                <p>Your questions will be visible to the host.</p>
            </div>
        </div>
    );
}

export default Question;