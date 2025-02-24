import { Link } from "react-router-dom";
import "./form.css"
import { useState } from "react";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../../redux/apiCalls/authApiCall";

import Loader from "../../components/loader/Loader";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { isLoading } = useSelector(state => state.loading);


    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (email === "") return toast.error("Email is required");
        if (password === "") return toast.error("Password is required");

        dispatch(loginUser({ email, password }))
    }



    if (isLoading) {
        return (
            <Loader />

        )
    }

    return (
        <section className="form-container">
            <h1 className="form-title">Login to your account</h1>
            <form onSubmit={handleSubmit} className="form">


                <div className="form-group">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>

                    <input type="email"
                        className="form-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        placeholder="Enter your email" />
                </div>



                <div className="form-group">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>

                    <input type="password"
                        className="form-input"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password" />
                </div>

                <button
                    className="form-btn"
                    type="submit">
                    Login
                </button>

            </form>

            <div className="form-footer">
                Did you forgot your password?? <Link to={"/forgot-password"}>Forgot Password</Link>
            </div>
        </section>
    );
}

export default Login;