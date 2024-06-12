import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    createBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    updateBlog(state, action) {
      const newBlog = action.payload;
      state.forEach((blog) => {
        if (blog.id === newBlog.id) {
          let index = state.indexOf(blog);
          state[index] = newBlog;
        }
      });
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({ type: "blog/setBlogs", payload: blogs });
  };
};

export const createBlog = (newObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(newObject);
    dispatch({ type: "blog/createBlog", payload: newBlog });
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = { ...blog, likes: blog.likes + 1 };
    await blogService.update(blog.id, newBlog);
    dispatch({ type: "blog/updateBlog", payload: newBlog });
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch({ type: "blog/deleteBlog", payload: id });
  };
};

export const commentBLog = (blog, content) => {
  return async (dispatch) => {
    const newBlog = await blogService.createComment(blog.id, {
      ...blog,
      comments: blog.comments.concat(content),
    });
    dispatch({ type: "blog/updateBlog", payload: newBlog });
  };
};

export default blogSlice.reducer;
