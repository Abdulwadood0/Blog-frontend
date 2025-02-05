import { authActions } from "../slices/authSlice";
import { loadingActions } from "../slices/loadingSlice";
import request from "../../utils/requset";

import { toast } from "react-toastify";

//Login User
export function loginUser(user) {
    return async (dispatch) => {
        try {
            dispatch(loadingActions.startLoading());

            const { data } = await request.post("/api/auth/login", user)

            dispatch(authActions.login(data));

            localStorage.setItem("userInfo", JSON.stringify(data));
            dispatch(loadingActions.stopLoading());

        } catch (error) {
            toast.error(error.response.data.message);
            dispatch(loadingActions.stopLoading());
        }
    }
}


//Logout User
export function logoutUser() {
    return async (dispatch) => {
        dispatch(authActions.logout());
        localStorage.removeItem("userInfo");
    }
}


//Register User
export function registerUser(user) {
    return async (dispatch) => {
        try {

            const { data } = await request.post("/api/auth/register", user)

            dispatch(authActions.register(data?.message));


        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}


//Verify Email
export function verifyEmail(userId, token) {
    return async (dispatch) => {
        try {

            await request.get(`/api/auth/${userId}/verify/${token}`)

            dispatch(authActions.setIsEmailVerified());


        } catch (error) {
            console.log(error);

        }
    }
}