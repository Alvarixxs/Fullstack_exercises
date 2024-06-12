import { commentBLog, likeBlog, removeBlog } from "../../store/blogReducer.js";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useField } from "../../hooks/index.js";

const Blog = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const blog = [...useSelector((state) => state.blogs)].find(
    (blog) => blog.id === id,
  );
  const { reset: resetComment, ...comment } = useField("text");

  if (!blog) {
    return null;
  }

  const handleLike = () => {
    dispatch(likeBlog(blog));
  };

  const handleRemove = () => {
    dispatch(removeBlog(blog.id));
  };

  const handleComment = () => {
    dispatch(commentBLog(blog, comment.value));
    resetComment();
  };

  const ownedByUser = blog?.user?.username === user?.username;

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes <button onClick={handleLike}>like</button>
      </div>
      <div>
        added by {blog?.user?.name}
        {ownedByUser ? <button onClick={handleRemove}>remove</button> : null}
      </div>
      <h3>comments</h3>
      <input {...comment} />
      <button onClick={handleComment}>add comment</button>
      <ul>
        {blog?.comments?.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
