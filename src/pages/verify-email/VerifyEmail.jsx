import { Link, useParams } from "react-router-dom";
import "./verify-email.css"

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { verifyEmail } from "../../redux/apiCalls/authApiCall";
import Loader from "../../components/loader/Loader";
const VerifyEmail = () => {
    const dispatch = useDispatch();
    const { isEmailVerified } = useSelector((state) => state.auth);
    const { isLoading } = useSelector(state => state.loading);

    const { userId, token } = useParams();

    useEffect(() => {
        dispatch(verifyEmail(userId, token));
    }, [userId, token]);

    if (isLoading) {
        return (

            <Loader />
        )
    }

    return (
        <section className="verify-email">
            {isEmailVerified ?
                <>
                    <i className="bi bi-patch-check verify-email-icon"></i>
                    <h1 className="verify-email-title">
                        Eamil verified successfully
                    </h1>

                    <Link to={"/login"} className="verify-email-link">
                        Go To Login Page
                    </Link>


                </> :
                <>
                    <h1 className="verify-email-not-found">
                        Not Found
                    </h1>
                </>}

        </section>
    );
}

export default VerifyEmail;