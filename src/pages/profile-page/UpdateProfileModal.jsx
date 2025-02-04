import "./update-profile.css"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/apiCalls/profileApiCall";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall"

const UpdateProfileModal = ({ setUpdateProfile, profile }) => {

    const dispatch = useDispatch();

    const [username, setUsername] = useState(profile.username);
    const [bio, setBio] = useState(profile.bio);
    const [password, setPassword] = useState("");


    // Form Submission Handler
    const handleSubmit = (e) => {
        e.preventDefault()

        const updatedUser = { username, bio }

        if (password.trim() !== "") {
            updatedUser.password = password;
        }

        dispatch(updateProfile(profile._id, updatedUser));
        setUpdateProfile(false);

    }



    return (
        <div className="update-profile">
            <form onSubmit={handleSubmit} className="update-profile-form">
                <abbr title="close">
                    <i
                        onClick={() => setUpdateProfile(false)}
                        className="bi bi-x-circle-fill update-profile-form-close"></i>
                </abbr>

                <h1 className="update-profile-title">Update Your Profile</h1>

                <input type="text" className="update-profile-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="username"
                />

                <input type="text" className="update-profile-input"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="bio"
                />

                <input type="text" className="update-profile-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password (optional)"
                />


                <button type="submit" className="update-profile-btn">
                    Update Profile
                </button>
            </form>
        </div>
    );
}

export default UpdateProfileModal;