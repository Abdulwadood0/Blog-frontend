import "./update-post.css"
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchSinglePost, updatePost } from "../../redux/apiCalls/postApiCall";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";
const UpdatePostModal = ({ setUpdatePost, post }) => {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.category);


    const [title, setTitle] = useState(post?.title);
    const [description, setDescription] = useState(post?.description);
    const [category, setCategory] = useState(post?.category);



    // Form Submission Handler 
    const handleSubmit = (e) => {
        e.preventDefault()

        if (title.trim() === "") return toast.error("Title is required");
        if (description.trim() === "") return toast.error("Description is required");
        if (category === "") return toast.error("Category is required");

        dispatch(updatePost({ title, category, description }, post?._id))
        setUpdatePost(false);
    }

    useEffect(() => {
        dispatch(fetchCategories());
    }, [])
    return (
        <div className="update-post">
            <form onSubmit={handleSubmit} className="update-post-form">
                <abbr title="close">
                    <i
                        onClick={() => setUpdatePost(false)}
                        className="bi bi-x-circle-fill update-post-form-close"></i>
                </abbr>

                <h1 className="update-post-title">Update Post</h1>

                <input type="text" className="update-post-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <select
                    className="update-post-input"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}>

                    <option disabled value="">
                        Select A Category
                    </option>

                    {categories.map(category =>
                        <option value={category.title}
                            key={category._id}>

                            {category.title}
                        </option>)}

                </select>

                <textarea value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="update-post-textarea"
                    rows="5"
                ></textarea>

                <button type="submit" className="update-post-btn">
                    Update Post
                </button>
            </form>
        </div>
    );
}

export default UpdatePostModal;