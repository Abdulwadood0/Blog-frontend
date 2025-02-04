import { postActions } from "../slices/postSlice";
import request from "../../utils/requset";
import { commentActions } from "../slices/commentSlice";
import { toast } from "react-toastify";

//Create a new comment
export function createComment(newComment) {
    return async (dispatch, getState) => {
        try {

            const { data } = await request.post("/api/comments", newComment, {
                headers: {
                    Authorization: `Bearer ${getState().auth.user.token}`
                }
            })

            dispatch(postActions.addCommentToPost(data));

        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}


//Update comment
export function updateComment(commentId, comment) {
    return async (dispatch, getState) => {
        try {

            const { data } = await request.put(`/api/comments/${commentId}`, comment, {
                headers: {
                    Authorization: `Bearer ${getState().auth.user.token}`,

                }
            })

            dispatch(postActions.updateCommentPost(data));

        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

//Delete comment (user)
export function deleteComment(commentId) {
    return async (dispatch, getState) => {
        try {

            await request.delete(`/api/comments/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${getState().auth.user.token}`,

                }
            })

            dispatch(postActions.deleteCommentPost(commentId));
        } catch (error) {
            console.log(error);

            toast.error(error?.response?.data?.message);
        }
    }
}

//Delete comment(Admin)
export function deleteCommentAdmin(commentId) {
    return async (dispatch, getState) => {
        try {

            await request.delete(`/api/comments/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${getState().auth.user.token}`,

                }
            })

            dispatch(commentActions.deleteComment(commentId));
        } catch (error) {
            console.log(error);

            toast.error(error?.response?.data?.message);
        }
    }
}

//Get all comments 
export function getAllComments(commentId) {
    return async (dispatch, getState) => {
        try {

            const { data } = await request.get(`/api/comments`, {
                headers: {
                    Authorization: `Bearer ${getState().auth.user.token}`,

                }
            })

            dispatch(commentActions.setComments(data))

        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}