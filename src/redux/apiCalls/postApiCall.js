import { postActions } from "../slices/postSlice";
import request from "../../utils/requset";
import { toast } from "react-toastify";
import { loadingActions } from "../slices/loadingSlice";

//Fetch Posts based on page number
export function fetchPosts(pageNumber) {
    return async (dispatch) => {
        try {
            dispatch(loadingActions.setLoading())

            const { data } = await request.get(`/api/posts?pageNumber=${pageNumber}`);
            dispatch(postActions.setPosts(data));
            dispatch(loadingActions.clearIsLoading());

        } catch (error) {
            toast.error(error.response.data.message);
            dispatch(loadingActions.clearIsLoading());
        }
    }
}


//Get All Posts 
export function fetchAllPosts(pageNumber) {
    return async (dispatch) => {
        try {
            dispatch(loadingActions.setLoading())

            const { data } = await request.get(`/api/posts`);
            dispatch(postActions.setPosts(data));
            dispatch(loadingActions.clearIsLoading());


        } catch (error) {
            toast.error(error.response.data.message);
            dispatch(loadingActions.clearIsLoading());
        }
    }
}


//Get Posts Count
export function getPostsCount(pageNumber) {
    return async (dispatch) => {
        try {
            dispatch(loadingActions.setLoading())

            const { data } = await request.get(`/api/posts/count`);
            dispatch(postActions.setPostsCount(data));
            dispatch(loadingActions.clearIsLoading());

        } catch (error) {
            toast.error(error.response.data.message);
            dispatch(loadingActions.clearIsLoading());
        }
    }
}

//Fetch Posts based on Category
export function fetchPostsBasedOnCategory(category) {
    return async (dispatch) => {
        try {
            dispatch(loadingActions.setLoading())

            const { data } = await request.get(`/api/posts?category=${category}`);
            dispatch(postActions.setPostsCatrgories(data));
            dispatch(loadingActions.clearIsLoading());

        } catch (error) {
            toast.error(error.response.data.message);
            dispatch(loadingActions.clearIsLoading());
        }
    }
}


//Create [Post]
export function createPost(post) {
    return async (dispatch, getState) => {
        try {
            dispatch(postActions.setLoading());
            await request.post(`/api/posts`, post, {
                headers: {
                    Authorization: `Bearer ${getState().auth.user.token}`,
                    "Content-Type": "multipart/form-data"
                }
            });



            dispatch(postActions.setIsPostCreated());
            setTimeout(() => dispatch(postActions.clearIsPostCreated()), 2000);

        } catch (error) {
            toast.error(error.response.data.message);
            dispatch(postActions.clearLoading());
        }
    }
}

//Fetch Single Post
export function fetchSinglePost(postId) {
    return async (dispatch) => {
        try {
            dispatch(loadingActions.setLoading());

            const { data } = await request.get(`/api/posts/${postId}`);
            dispatch(postActions.setPost(data));
            dispatch(loadingActions.clearIsLoading());

        } catch (error) {
            toast.error(error.response.data.message);
            dispatch(loadingActions.clearIsLoading());
        }
    }
}


//Toggle Like Post
export function toggleLikePost(postId) {

    return async (dispatch, getState) => {

        try {
            const { data } = await request.put(`/api/posts/like/${postId}`, {}, {
                headers: {
                    Authorization: `Bearer ${getState().auth.user.token}`
                }
            });
            dispatch(postActions.setLike(data.post.likes));

        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}


//Update Post Image
export function updatePostImage(newImage, postId) {

    return async (dispatch, getState) => {

        try {
            dispatch(loadingActions.setLoading())

            await request.put(`/api/posts/${postId}`, newImage, {
                headers: {
                    Authorization: `Bearer ${getState().auth.user.token}`,
                    "Content-Type": "multipart/form-data"
                }
            });

            toast.success("Post Image Updated Successfully");
            dispatch(loadingActions.clearIsLoading());

        } catch (error) {
            toast.error(error.response.data.message);
            dispatch(loadingActions.clearIsLoading());
        }
    }
}


//Update Post 
export function updatePost(newPost, postId) {

    return async (dispatch, getState) => {

        try {
            dispatch(loadingActions.setLoading())

            const { data } = await request.put(`/api/posts/${postId}`, newPost, {
                headers: {

                    Authorization: `Bearer ${getState().auth.user.token}`,
                }
            });

            dispatch(postActions.setPost(data));
            dispatch(loadingActions.clearIsLoading())

        } catch (error) {
            toast.error(error.response.data.message);
            dispatch(loadingActions.clearIsLoading());
        }
    }
}


//Delete Post 
export function deletePost(postId) {

    return async (dispatch, getState) => {
        try {
            dispatch(loadingActions.setLoading())

            const { data } = await request.delete(`/api/posts/${postId}`, {
                headers: {
                    Authorization: `Bearer ${getState().auth.user.token}`,
                }
            });

            dispatch(postActions.deletePost(postId));
            toast.success(data.message);
            dispatch(postActions.clearIsPostCreated());
            dispatch(loadingActions.clearIsLoading());

        } catch (error) {
            toast.error(error.response.data.message);
            dispatch(loadingActions.clearIsLoading());
        }
    }
}