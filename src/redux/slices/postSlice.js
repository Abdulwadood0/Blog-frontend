import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: [],
        postsCount: null,
        postsCategories: [],
        loading: false,
        isPostCreated: false,
        isPostDeleted: null,
        post: null,

    },

    reducers: {
        setPosts(state, action) {
            state.posts = action.payload;
        },
        setPostsCount(state, action) {
            state.postsCount = action.payload;
        },
        setPostsCatrgories(state, action) {
            state.postsCategories = action.payload;
        },
        setLoading(state) {
            state.loading = true;
        },
        clearLoading(state) {
            state.loading = false;
        },
        setIsPostCreated(state) {
            state.isPostCreated = true;
            state.loading = false;
        },
        clearIsPostCreated(state) {
            state.isPostCreated = false;
        },
        setPost(state, action) {
            state.post = action.payload;
        },
        setLike(state, action) {
            state.post.likes = action.payload;
        },
        deletePost(state, action) {
            state.posts = state.posts.filter((post) => post._id !== action.payload);
            state.isPostDeleted = true;
        },
        clearIsPostDeleted(state, action) {
            state.isPostDeleted = false;
        },
        addCommentToPost(state, action) {
            state.post.comments.push(action.payload)
        },
        updateCommentPost(state, action) {
            state.post.comments = state.post.comments.map(comment =>
                comment._id === action.payload._id ? action.payload : comment
            )
        },
        deleteCommentPost(state, action) {
            state.post.comments = state.post.comments.filter(comment =>
                comment._id !== action.payload
            )
        },



    }
})

const postReducer = postSlice.reducer;
const postActions = postSlice.actions;

export { postReducer, postActions };