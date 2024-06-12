import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function User() {
  const { id } = useParams();
  console.log(id);
  const user = [...useSelector((state) => state.users)].find(
    (user) => user.id === id,
  );

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default User;
