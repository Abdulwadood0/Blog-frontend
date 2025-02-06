import { passwordActions } from "../slices/passwordSlice";
import request from "../../utils/requset";

import { toast } from "react-toastify";
import { loadingActions } from "../slices/loadingSlice";

//Forgot Password
export function forgotPassword(email) {
    return async (dispatch) => {
        try {

            dispatch(loadingActions.setLoading())

            const { data } = await request.post("/api/password/reset-password-link", { email });
            toast.success(data.message);
            dispatch(loadingActions.clearIsLoading())

        } catch (error) {
            toast.error(error.response.data.message);
            dispatch(loadingActions.clearIsLoading())

        }
    }
}



//Get Reset Password
export function getResetPassword(userId, token) {
    return async (dispatch) => {
        try {
            dispatch(loadingActions.setLoading())

            await request.get(`/api/password/reset-password/${userId}/${token}`);
            dispatch(loadingActions.clearIsLoading())

        } catch (error) {
            console.log(error);
            dispatch(passwordActions.setError())
            dispatch(loadingActions.clearIsLoading())
        }
    }
}



//Reset The Password
export function resetPassword(newPassword, user) {
    return async (dispatch) => {
        try {
            dispatch(loadingActions.setLoading())


            const { data } = await request.post(`/api/password/reset-password/${user.userId}/${user.token}`, {
                password: newPassword,
            });

            toast.success(data.message);
            dispatch(loadingActions.clearIsLoading())


        } catch (error) {
            toast.error(error.response.data.message);
            dispatch(loadingActions.clearIsLoading())
        }
    }
}