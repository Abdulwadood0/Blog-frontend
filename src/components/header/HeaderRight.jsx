import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

const HeaderRigth = () => {
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);

    const [dropdown, setDropdown] = useState(false);

    const navigate = useNavigate();
    const logoutHandler = () => {
        dispatch(logoutUser());
        setDropdown(false);
        navigate("/")
    }
    return (
        <div className="header-right">
            {user ?
                <>
                    <div className="header-right-user-info">
                        <span className="header-right-username"
                            onClick={() => setDropdown(!dropdown)}
                        >
                            {user?.username}
                        </span>

                        <img src={user?.profilePhoto?.url}
                            alt="user"
                            className="header-right-user-photo">

                        </img>


                        {dropdown && (
                            <div className="header-right-dropdown">
                                <Link to={`/profile/${user?._id}`}
                                    onClick={() => setDropdown(!dropdown)}
                                    className="header-dropdown-item">
                                    <i className="bi bi-file-person"></i>
                                    <span>Profile</span>
                                </Link>

                                <div className="header-dropdown-item"
                                    onClick={logoutHandler}
                                >
                                    <i className="bi bi-box-arrow-in-left"></i>
                                    <span>Logout</span>
                                </div>
                            </div>
                        )}



                    </div>
                </>
                : <>  <Link to="/login" className="header-right-link">
                    <i className="bi bi-box-arrow-in-right"></i>
                    <span>Login</span>
                </Link >

                    <Link to="/register" className="header-right-link">
                        <i className="bi bi-person-plus"></i>
                        <span>Register</span>
                    </Link ></>}
        </div>
    );
}

export default HeaderRigth;