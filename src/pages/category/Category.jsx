import { useParams, Link } from "react-router-dom";
import "./category.css"
import PostList from "../../components/posts/PostList";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchPostsBasedOnCategory } from "../../redux/apiCalls/postApiCall";

const Category = () => {

    const dispatch = useDispatch();
    const { postsCategories } = useSelector((state) => state.post);

    const { category } = useParams();

    useEffect(() => {
        dispatch(fetchPostsBasedOnCategory(category));
        window.scrollTo(0, 0); // scroll to the top of the page when the component renders
    }, [category])


    return (
        <section className="category">
            <h1 className="category-title">Posts based on {category}</h1>

            {postsCategories.length === 0 && <h2 style={{ color: "red" }}>No posts found for this category</h2>}

            <PostList posts={postsCategories} />
        </section>);
}

export default Category;