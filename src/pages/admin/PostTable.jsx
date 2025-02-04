import { Link } from "react-router-dom";
import AdimnSidebar from "./AdminSidebar";
import "./admin-table.css"
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { deletePost, fetchAllPosts } from "../../redux/apiCalls/postApiCall";

const PostTable = () => {
    const dispatch = useDispatch();
    const { posts } = useSelector(state => state.post);

    useEffect(() => {
        dispatch(fetchAllPosts())
    }, [])


    const deletePostHandler = (postId) => {
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
                dispatch(deletePost(postId))
            }
        });
    }

    return (
        <section className="table-container">
            <AdimnSidebar />
            <div className="table-wrapper">

                <h1 className="table title">Posts</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>User</th>
                            <th>Post Title</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {posts.map((item, index) => (
                            <tr key={item?._id}>
                                <td>{index + 1}</td>

                                <td>
                                    <div className="table-image">
                                        <img src={item?.user?.profilePhoto?.url || `/images/user-avatar.png`}
                                            alt=""
                                            className="user-avatar" />

                                        <span className="table-username">{item?.user?.username}</span>
                                    </div>

                                </td>

                                <td>{item?.title}</td>

                                <td>
                                    <div className="table-button-group">
                                        <button>
                                            <Link style={{ color: "white" }} to={`/posts/details/${item?._id}`}>
                                                View Post
                                            </Link>
                                        </button>

                                        <button onClick={() => deletePostHandler(item?._id)}>
                                            Delete Post
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>



            </div>
        </section>
    );
}

export default PostTable;