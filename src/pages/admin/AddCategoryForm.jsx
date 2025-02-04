import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux"
import { createCategory } from "../../redux/apiCalls/categoryApiCall";

const AddCategoryForm = () => {

    const dispatch = useDispatch()

    const [title, setTitle] = useState("")

    // Form Submission Handler
    const handleSubmit = (e) => {
        e.preventDefault()
        if (title.trim() === "") return toast.error("Title is required")

        dispatch(createCategory({ title }))
        setTitle("");
    }
    return (
        <div className="add-category">
            <h6 className="add-category-title">Add new Category</h6>

            <form onSubmit={handleSubmit}>

                <div className="add-category-form-group">
                    <label htmlFor="title">Category Title</label>

                    <input type="text" id="title"
                        placeholder="Enter Category Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                </div>

                <button className="add-category-btn" type="submit">Add</button>
            </form>


        </div>
    );
}

export default AddCategoryForm;