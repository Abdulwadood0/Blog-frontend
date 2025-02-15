import "./form.css"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getResetPassword, resetPassword } from "../../redux/apiCalls/passwordApiCall";
import Loader from "../../components/loader/Loader";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const { isError } = useSelector(state => state.password);
    const { userId, token } = useParams();


    useEffect(() => {
        dispatch(getResetPassword(userId, token));
    }, [userId, token]);


    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password === "") return toast.error("Password is required");

        dispatch(resetPassword(password, { userId, token }));
    }

    const { isLoading } = useSelector(state => state.loading);


    if (isLoading) {
        return (

            <Loader />
        )
    }


    return (
        <section className="form-container">
            {isError ? <h1>Not Found</h1> :
                <>
                    <h1 className="form-title">Reset Password</h1>
                    <form onSubmit={handleSubmit} className="form">

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                New Password
                            </label>

                            <input type="password"
                                className="form-input"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your new password" />
                        </div>

                        <button
                            className="form-btn"
                            type="submit">
                            Submit
                        </button>

                    </form>
                </>}

        </section>
    );
}

export default ResetPassword;