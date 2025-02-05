import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/authSlice'
import { profilReducer } from './slices/profileSlice'
import { postReducer } from './slices/postSlice'
import { categoryReducer } from './slices/categorySlice'
import { commentReducer } from './slices/commentSlice'
import { passwordReducer } from './slices/passwordSlice'
import { loadingReducer } from './slices/loadingSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profilReducer,
        post: postReducer,
        category: categoryReducer,
        comment: commentReducer,
        password: passwordReducer,
        loading: loadingReducer,
    },
})