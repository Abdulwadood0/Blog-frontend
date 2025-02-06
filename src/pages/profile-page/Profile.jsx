import "./profile.css"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UpdateProfileModal from "./UpdateProfileModal";
import { deleteProfile, getUserProfile, UploadProfilePhoto } from "../../redux/apiCalls/profileApiCall";
import PostItem from "../../components/posts/PostItem";
import ClipLoader from "react-spinners/ClipLoader";
import { logoutUser } from "../../redux/apiCalls/authApiCall"
import Loader from "../../components/loader/Loader";
const Profile = () => {
    const dispatch = useDispatch();
    const { profile, loading, isProfileDeleted } = useSelector((state) => state.profile);
    const { user } = useSelector((state) => state.auth);
    const { isLoading } = useSelector(state => state.loading);


    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [updateProfile, setUpdateProfile] = useState(false);

    //Form Submission Handler
    const handleSubmit = (e) => {
        // so it doesn't refresh the page ��
        e.preventDefault();
        if (!file) return toast.error("Please upload a profile photo");

        const formData = new FormData();
        formData.append("image", file);
        dispatch(UploadProfilePhoto(formData))
    }

    //Delete Account Handler
    const deleteAccountHandler = () => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteProfile(user?._id))
                dispatch(logoutUser());
                // Swal.fire({
                //     title: "Deleted!",
                //     text: "Your Account has been deleted.",
                //     icon: "success"
                // });
            }
        });

    }


    const { id } = useParams();
    useEffect(() => {
        dispatch(getUserProfile(id))
        window.scrollTo(0, 0);
    }, [id, dispatch])


    useEffect(() => {
        if (isProfileDeleted) {
            navigate("/");
        }
    }, [navigate, isProfileDeleted])


    if (isLoading) {
        return (
            <Loader />

        )
    }

    if (loading) {
        return (
            <div className="profile-loader">
                <ClipLoader
                    color="blue"
                    loading={true}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"

                />
            </div>

        )
    }
    return (
        <section className="profile">
            <div className="profile-header">

                <div className="profile-image-wrapper">
                    <img src={file ? URL.createObjectURL(file) : profile?.profilePhoto.url}
                        alt=""
                        className="profile-image" />


                    {user?._id === profile?.id && <form onSubmit={handleSubmit}>
                        <abbr title="choose profile photo">
                            <label htmlFor="file"
                                className="bi bi-camera-fill upload-photo-profile-icon"></label>
                        </abbr>

                        <input
                            style={{ display: "none" }}
                            type="file"
                            name="file"
                            id="file"
                            onChange={(e) => setFile(e.target.files[0])} />

                        <button type="submit" className="upload-profile-photot-btn">
                            Upload
                        </button>

                    </form>}


                </div>

                <h1 className="profile-username">{profile?.username}</h1>

                <p className="profile-bio">
                    {profile?.bio}
                </p>

                <div className="user-date-joined">
                    <strong>Date Joined: </strong>
                    <span>{new Date(profile?.createdAt).toDateString()}</span>
                </div>

                {user?._id === profile?.id && <button onClick={() => setUpdateProfile(true)} className="profile-update-btn">
                    <i className="bi bi-file-person-fill"></i>
                    Update Profile
                </button>}

            </div>

            <div className="profile-posts-list">
                <h2>{profile?.username} Posts</h2>
                {profile?.posts?.map((post) =>
                    <PostItem
                        post={post}
                        key={post._id}
                        username={profile?.username}
                        userId={profile?._id}
                    ></PostItem>
                )}


            </div>


            {user?._id === profile?._id && <button onClick={deleteAccountHandler} className="delete-account-btn">
                Delete Your Acoount
            </button>}



            {updateProfile && <UpdateProfileModal profile={profile} setUpdateProfile={setUpdateProfile} />}
        </section>
    );
}

export default Profile;