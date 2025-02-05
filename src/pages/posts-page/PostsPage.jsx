import { useEffect, useState } from "react";
import Pagination from "../../components/pagination/Pagination";
import PostList from "../../components/posts/PostList";
import Sidebar from "../../components/sidebar/Sidebar";
import "./posts-page.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getPostsCount } from "../../redux/apiCalls/postApiCall";
import ClipLoader from "react-spinners/ClipLoader";

const POST_PER_PAGE = 3;
const PostsPage = () => {
    const dispatch = useDispatch();
    const { postsCount, posts } = useSelector(state => state.post);
    const { isLoading } = useSelector(state => state.loading);

    const [currentPage, setCurrentPage] = useState(1);

    const pages = Math.ceil(postsCount / POST_PER_PAGE);
    // when the component renders, scroll to the top of the page
    useEffect(() => {
        dispatch(fetchPosts(currentPage));
        window.scrollTo(0, 0);
    }, [currentPage])


    useEffect(() => {
        dispatch(getPostsCount());
    }, [])

    if (isLoading) {
        return (
            <div className="loader">
                <ClipLoader
                    color="blue"
                    loading={true}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>

        )
    }

    return (
        <>
            <section className="posts-page">
                <PostList posts={posts} />
                <Sidebar />
            </section>
            <Pagination pages={pages} currentPage={currentPage}
                setCurrentPage={setCurrentPage} />
        </>

    );
}

export default PostsPage;