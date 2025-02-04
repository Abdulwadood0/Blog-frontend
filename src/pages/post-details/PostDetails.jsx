// all url params are in the useParams() hook
import { Link, useParams, useNavigate } from "react-router-dom";

import "./post-details.css"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";

import Swal from "sweetalert2";
import UpdatePostModal from "./UpdatePostModal";

import { useDispatch, useSelector } from "react-redux";
import { deletePost, fetchSinglePost, toggleLikePost, updatePostImage } from "../../redux/apiCalls/postApiCall";
import dayjs from "dayjs";


const PostDetails = () => {
    const dispatch = useDispatch();
    const { post } = useSelector(state => state.post);
    const { user } = useSelector(state => state.auth);




    const { id } = useParams();
    const [file, setFile] = useState(null);
    const [updatePost, setUpdatePost] = useState(false)

    useEffect(() => {
        dispatch(fetchSinglePost(id))
        window.scrollTo(0, 0)
    }, [id])




    // Update Image submit handler
    const submitHandler = (e) => {
        e.preventDefault();
        if (!file) return toast.error("there is no file")

        const formData = new FormData();
        formData.append("image", file);
        dispatch(updatePostImage(formData, post?._id));


    }

    // Delete Post Handler
    const navigate = useNavigate();
    const deletePostHandler = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((isOk) => {
            if (isOk.isConfirmed) {
                if (dispatch(deletePost(post?._id))) {
                    navigate("/")
                }
            }
            else {

            }
        });
    }

    return (

        <section className="post-details">
            <div className="post-details-image-wrapper">

                <img src={file ? URL.createObjectURL(file) : post?.image?.url} alt="" className="post-details-image" />

                {user?._id === post?.user?._id && <form onSubmit={submitHandler} className="update-post-image-form">

                    <label htmlFor="file" className="update-post-label">
                        <i className="bi bi-image-fill"></i>
                        Select New Image
                    </label>

                    <input
                        onChange={(e) => setFile(e.target.files[0])}
                        type="file"
                        id="file"
                        name="file" style={{ display: "none" }} />

                    <button type="submit">Upload</button>
                </form>}

            </div>

            <h1 className="post-details-title">{post?.title}</h1>

            <div className="post-details-user-info">
                <img src={post?.user?.profilePhoto?.url} alt="" className="post-details-user-image" />
                <div className="post-details-user">

                    <strong>
                        <Link to={`/profile/${post?.user._id}`} className="post-details-username">
                            {post?.user?.username}
                        </Link>
                    </strong>

                    <span>{dayjs(post?.createdAt).format("ddd MMM D YYYY")}</span>

                </div>
            </div>

            <p className="post-details-description">
                {post?.description + " "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ad accusantium, quis perferendis perspiciatis doloribus, nemo delectus asperiores minus adipisci deserunt autem, dignissimos enim ratione nulla sit? Perspiciatis, eligendi sunt.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus tenetur recusandae magnam neque aspernatur sunt necessitatibus tempora, consequuntur quis amet. Assumenda quasi tempora, atque doloribus doloremque porro vel omnis adipisci.
            </p>

            <div className="post-details-icon-wrapper">


                <div>
                    {user && (
                        <i className={
                            post?.likes?.includes(user._id) ? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up"
                        }

                            onClick={() => dispatch(toggleLikePost(post._id))}
                        >

                        </i>
                    )}
                    <small>{post?.likes?.length} likes</small>

                </div>



                {user?._id === post?.user?._id && <div>
                    <i className="bi bi-pencil-square"
                        onClick={() => setUpdatePost(true)}
                    ></i>
                    <i onClick={deletePostHandler} className="bi bi-trash-fill"></i>

                </div>}

            </div>


            {user ? <AddComment postId={post?._id} /> :
                <p>
                    Please <Link style={{ color: "blue" }} to="/login">Login</Link> to comment or like this post.
                </p>
            }


            <CommentList comments={post?.comments} user={user} />

            {updatePost && <UpdatePostModal post={post} setUpdatePost={setUpdatePost} />}

        </section>
    )
};

export default PostDetails;