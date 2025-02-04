import "./comment-list.css"
import Swal from "sweetalert2";
import { useState } from "react";
import UpdateCommentModal from "./UpdateCommentModal";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../redux/apiCalls/commentApiCall";

const CommentList = ({ comments, user }) => {
    const dispatch = useDispatch()

    dayjs.extend(relativeTime);

    const { post } = useSelector(state => state.post)

    const [updateComment, setUpdateComment] = useState(false)

    const [comment, setComment] = useState("")

    //Update Comment Handler
    const updateCommentHandler = (comment) => {
        setUpdateComment(true)
        setComment(comment)
    }
    // Delete Post Handler
    const deleteCommenttHandler = (commentId) => {
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
                if (dispatch(deleteComment(commentId))) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Comment has been deleted.",
                        icon: "success"
                    });
                }

            }
        });
    }
    return (

        <div className="comment-list">
            <h4 className="comment-list-count">{comments?.length} Comments</h4>
            {comments?.map((comment, index) => (

                <div key={comment?._id} className="comment-item">

                    <div className="comment-item-info">
                        <div className="comment-item-username">
                            {comment?.username}
                        </div>

                        <div className="comment-item-time">
                            {dayjs(comment?.createdAt).fromNow()}

                        </div>
                    </div>

                    <p className="comment-item-text">
                        {comment?.text}
                    </p>

                    {(user?._id === comment?.user) && <div className="comment-item-icon-wrapper">

                        <i onClick={() => {
                            updateCommentHandler(comment)
                        }}
                            className="bi bi-pencil-square">

                        </i>

                        <i onClick={() => deleteCommenttHandler(comment._id)} className="bi bi-trash-fill"></i>

                    </div>}


                </div>
            ))}

            {updateComment && <UpdateCommentModal comment={comment} setUpdateComment={setUpdateComment} />}

        </div>
    );
}

export default CommentList;