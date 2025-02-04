import { useEffect, useState } from "react";
import "./create-post.css";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../redux/apiCalls/postApiCall";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";

const CreatePost = () => {
    const dispatch = useDispatch();
    const { loading, isPostCreated } = useSelector((state) => state.post);
    const { categories } = useSelector((state) => state.category);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [file, setFile] = useState(null);


    // Form Submission Handler
    const handleSubmit = (e) => {
        // so it doesn't refresh the page 👇
        e.preventDefault();
        if (title.trim() === "") return toast.error("Title is required");
        if (description.trim() === "") return toast.error("Description is required");
        if (category === "") return toast.error("Category is required");
        if (!file) return toast.error("File is required");


        // because we are sending a file we need to use FormData
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("image", file);


        dispatch(createPost(formData));

    }

    const navigate = useNavigate();
    useEffect(() => {
        if (isPostCreated) {
            navigate("/");
        }
    }, [isPostCreated, navigate])

    useEffect(() => {
        dispatch(fetchCategories())
    }, [])

    useEffect(() => {
        if (categories.length > 0) {
            setCategory(categories[0].title); // ✅ Set the first category title as default
        }
    }, [categories]);

    return (
        <section className="create-post">



            <h1 className="create-post-title">
                Create New Post
            </h1>

            <form onSubmit={handleSubmit} className="create-post-form">
                <input type="text"
                    className="create-post-input"
                    placeholder="Post Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />


                <select

                    onChange={(e) => setCategory(e.target.value)}

                    className="create-post-input">
                    <option disabled value="">
                        Select A Category
                    </option>
                    {categories?.map(category =>
                        <option value={category?.title}
                            key={category?._id}
                        >{category?.title}</option>)}
                </select>

                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="create-post-textarea"
                    rows="5"
                    placeholder="Post Description">

                </textarea>

                <input type="file" name="file" id="file"
                    className="create-post-upload"
                    onChange={(e) => setFile(e.target.files[0])} />

                <button type="submit" className="create-post-btn">
                    {
                        loading ? "Loading..." : "Create"
                    }
                </button>
            </form>
        </section>
    );
}

export default CreatePost;