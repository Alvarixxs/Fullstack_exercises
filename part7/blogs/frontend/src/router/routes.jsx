import App from "../components/app/App.jsx";
import Users from "../components/users/Users";
import BlogList from "../components/blogList/BlogList.jsx";
import User from "../components/user/User.jsx";
import Blog from "../components/blog/Blog.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "users/:id",
        element: <User />,
      },
      {
        path: "blogs",
        element: <BlogList />,
      },
      {
        path: "blogs/:id",
        element: <Blog />,
      },
    ],
  },
];

export default routes;
