import { categoryActions } from "../slices/categorySlice";
import request from "../../utils/requset";

import { toast } from "react-toastify";

//Fetch All Categories
export function fetchCategories() {
    return async (dispatch) => {
        try {

            const { data } = await request.get("/api/categories")

            dispatch(categoryActions.setCategories(data));

        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}


//Create Category
export function createCategory(category) {
    return async (dispatch, getState) => {
        try {

            const { data } = await request.post("/api/categories", category, {
                headers: {
                    Authorization: `Bearer ${getState().auth.user.token}`,
                }
            })

            dispatch(categoryActions.addCategory(data));
            toast.success("Category created successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}


//Delete Category
export function deleteCategory(categoryId) {
    return async (dispatch, getState) => {
        try {

            const { data } = await request.delete(`/api/categories/${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${getState().auth.user.token}`,
                }
            })

            dispatch(categoryActions.removeCategory(data.categoryId));
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}