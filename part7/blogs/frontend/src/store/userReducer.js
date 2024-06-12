import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login.js";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    noUser() {
      return null;
    },
  },
});

export const initializeUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch({ type: "user/setUser", payload: user });
    }
  };
};

export const loginUser = (username, password) => {
  return (dispatch) => {
    loginService.login({ username, password }).then((user) => {
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch({ type: "user/setUser", payload: user });
      return user;
    });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch({ type: "user/noUser" });
  };
};

export default userSlice.reducer;
