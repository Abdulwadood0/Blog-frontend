import AdimnSidebar from "./AdminSidebar";
import "./admin-table.css"
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { deleteCommentAdmin, getAllComments } from "../../redux/apiCalls/commentApiCall";

const CommentsTable = () => {
    const dispatch = useDispatch();
    const { comments } = useSelector(state => state.comment)

    useEffect(() => {
        dispatch(getAllComments())
    }, [])

    const deleteCommentHandler = (commentId) => {
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
                dispatch(deleteCommentAdmin(commentId))
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
                            <th>Comment Title</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {comments?.map((item, index) => (
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

                                <td>{item?.text}</td>

                                <td>
                                    <div className="table-button-group">

                                        <button onClick={() => deleteCommentHandler(item?._id)}>
                                            Delete Comment
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

export default CommentsTable;