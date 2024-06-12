import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BlogForm from "../blogForm/BlogForm.jsx";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

function BlogList() {
  const blogs = useSelector((state) => state.blogs);
  return (
    <div>
      <BlogForm></BlogForm>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={blog.id}>{blog.title}</Link>
                </TableCell>
                <TableCell>{blog?.user?.username}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default BlogList;
