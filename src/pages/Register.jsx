import { useState } from "react";
import axios from 'axios';
import { serverEndpoint } from "../config/appConfig";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        let newErrors = {};
        let isValid = true;

        if (formData.name.trim().length === 0) {
            newErrors.name = "Name is mandatory";
            isValid = false;
        }

        if (formData.email.trim().length === 0) {
            newErrors.email = "Email is mandatory";
            isValid = false;
        }

        if (formData.password.trim().length === 0) {
            newErrors.password = "Password is mandatory";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validate()) {
            const body = {
                name: formData.name,
                email: formData.email,
                password: formData.password
            };
            const configuration = {
                withCredentials: true
            };
            try {
                const response = await axios.post(
                    `${serverEndpoint}/auth/register`,
                    body,
                    configuration
                );

                // ✅ Navigate to homepage if registration successful
                navigate("/");

            } catch (error) {
                console.error(error);
                if (error?.response?.status === 400) {
                    setErrors({ message: error.response.data.message || 'User already exists' });
                } else {
                    setErrors({ message: 'Something went wrong, please try again' });
                }
            }
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <h2 className="text-center mb-4">Register</h2>

                    {errors.message && (
                        <div className="alert alert-danger" role="alert">
                            {errors.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && (
                                <div className="invalid-feedback">
                                    {errors.name}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && (
                                <div className="invalid-feedback">
                                    {errors.email}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && (
                                <div className="invalid-feedback">
                                    {errors.password}
                                </div>
                            )}
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">Register</button>
                        </div>
                    </form>

                    {/* Optional Google Sign-In */}
                    {/* Uncomment if you're using Google OAuth */}
                    {/*
                    <div className="text-center">
                        <div className="my-4 d-flex align-items-center text-muted">
                            <hr className="flex-grow-1" />
                            <span className="px-2">OR</span>
                            <hr className="flex-grow-1" />
                        </div>
                        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                            <GoogleLogin
                                onSuccess={handleGoogleSignin}
                                onError={handleGoogleSigninFailure}
                            />
                        </GoogleOAuthProvider>
                    </div>
                    */}
                </div>
            </div>
        </div>
    );
}

export default Register;
