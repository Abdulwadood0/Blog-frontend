import PostItem from "./PostItem";
import './posts.css';
const PostList = ({ posts }) => {

    return (
        <div className="post-list">
            {posts?.map((post) => {
                return <PostItem post={post} key={post._id}></PostItem>
            })}
        </div>

    );
}

export default PostList;