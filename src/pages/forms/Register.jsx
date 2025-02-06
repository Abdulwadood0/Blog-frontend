import { Link, useNavigate } from "react-router-dom";
import "./form.css"
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/apiCalls/authApiCall";
import Swal from "sweetalert2";
import Loader from "../../components/loader/Loader";
import { authActions } from "../../redux/slices/authSlice";

const Register = () => {

    const dispatch = useDispatch();
    const { registerMessage } = useSelector((state) => state.auth);
    const { isLoading } = useSelector(state => state.loading);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (username === "") return toast.error("Username is required");
        if (email === "") return toast.error("Email is required");
        if (password === "") return toast.error("Password is required");

        dispatch(registerUser({ username, email, password }))
    }

    const navigate = useNavigate();

    if (registerMessage) {
        new Swal({
            title: registerMessage,
            icon: "success",
            confirmButtonText: "Ok"
        }).then(result => {
            if (result.isConfirmed) {
                navigate("/login");
                dispatch(authActions.clearRegisterMessage());
            }
        })
    }


    if (isLoading) {
        return (

            <Loader />
        )
    }


    return (
        <section className="form-container">
            <h1 className="form-title">Create new account</h1>
            <form onSubmit={handleSubmit} className="form">

                <div className="form-group">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>

                    <input type="text"
                        className="form-input"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username" />
                </div>



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
                    Register
                </button>

            </form>

            <div className="form-footer">
                Already have an account? <Link to={"/login"}>Login</Link>
            </div>
        </section>
    );
}

export default Register;