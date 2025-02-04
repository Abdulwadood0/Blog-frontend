import AdimnSidebar from "./AdminSidebar";
import "./admin-table.css"
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { deleteCategory, fetchCategories } from "../../redux/apiCalls/categoryApiCall";

const CategoriesTable = () => {
    const dispatch = useDispatch()
    const { categories } = useSelector(state => state.category)


    useEffect(() => {
        dispatch(fetchCategories());

    }, [])

    const deleteCategoryHandler = (categoryId) => {
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
                dispatch(deleteCategory(categoryId))

            }
        });
    }

    return (
        <section className="table-container">
            <AdimnSidebar />
            <div className="table-wrapper">

                <h1 className="table title">Categories</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>Category Title</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categories?.map((category, index) => (
                            <tr key={category._id}>
                                <td>{index + 1}</td>

                                <td>
                                    <b>{category?.title}</b>

                                </td>

                                <td>
                                    <div className="table-button-group">

                                        <button onClick={() => { deleteCategoryHandler(category._id) }}>
                                            Delete Category
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

export default CategoriesTable;