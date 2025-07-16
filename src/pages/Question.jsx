import axios from "axios";
import { useState } from "react";
import { serverEndpoint } from "../config/appConfig";

function Question({ roomCode }) {
    const [question, setQuestion] = useState("");
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState(null);

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

    async function handleSubmit() {
        if (isValid()) {
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

                console.log(response);
                setQuestion("");
                if (response) setMessage("Question posted. Please wait...");
                console.log("Question posted");
            } catch (error) {
                console.error(" Error posting question:", error);
                setErrors({
                    message: "Error posting question, please try again"
                });
            }
        }
    }

    return (
        <div className="container text-center py-5">
            <h2 className="mb-4">What doubts do you have, dear?</h2>
            <div className="row">
                <div className="col-md-5 mx-auto">
                    <div className="mb-3">
                        <label htmlFor="question">Question:</label>
                        <input
                            type="text"
                            id="question"
                            name="question"
                            className={errors.question ? "form-control is-invalid" : "form-control"}
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                        {errors.question && (
                            <div className="invalid-feedback">{errors.question}</div>
                        )}
                    </div>

                    {errors.message && (
                        <div className="text-danger mb-2">{errors.message}</div>
                    )}

                    {message && (
                        <div className="text-success mb-2">{message}</div>
                    )}

                    <div className="mb-3">
                        <button type="button" onClick={handleSubmit} className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Question;
