import { toast } from "react-toastify";
import { useState } from "react";
import "./update-comment.css";
import { useDispatch } from "react-redux";
import { updateComment } from "../../redux/apiCalls/commentApiCall";

const UpdateCommentModal = ({ comment, setUpdateComment }) => {
    const dispatch = useDispatch();

    const [text, setText] = useState(comment?.text);

    // Form Submission Handler
    const handleSubmit = (e) => {
        e.preventDefault()

        if (text.trim() === "") return toast.error("Please write something");

        dispatch(updateComment(comment?._id, { text }))
        setUpdateComment(false);
    }

    return (
        <div className="update-comment">
            <form onSubmit={handleSubmit} className="update-comment-form">
                <abbr title="close">
                    <i
                        onClick={() => setUpdateComment(false)}
                        className="bi bi-x-circle-fill update-post-comment-close"></i>
                </abbr>

                <h1 className="update-comment-title">Update Comment</h1>

                <input type="text" className="update-comment-input"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <button type="submit" className="update-post-btn">
                    Update Post
                </button>
            </form>
        </div>
    );
}

export default UpdateCommentModal;