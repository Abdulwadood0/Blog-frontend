import PostList from "../../components/posts/PostList";
import "./home.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "../../redux/apiCalls/postApiCall";
import Loader from "../../components/loader/Loader";


const Home = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts(1))
    }, [dispatch])

    const { posts } = useSelector(state => state.post);

    const { isLoading } = useSelector(state => state.loading);


    if (isLoading) {
        return (

            <Loader />
        )
    }
    return (
        <section className="home">
            <div className="home-hero-header">
                <div className="home-hero-header-layout">
                    <h1 className="home-title">Welcome To Blog</h1>
                </div>
            </div>

            <div className="home-latest-post">Latest Posts</div>

            <div className="home-container">
                <PostList posts={posts} />
                <Sidebar />
            </div>

            <div className="home-see-post-link">
                <Link to={"/posts"} className="home-link">
                    See All Posts
                </Link>
            </div>
        </section>
    );
}

export default Home;