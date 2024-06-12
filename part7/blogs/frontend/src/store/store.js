import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notificationReducer.js";
import blogReducer from "./blogReducer.js";
import userReducer from "./userReducer.js";
import usersReducer from "./usersReducer.js";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    notification: notificationReducer,
    users: usersReducer,
  },
});

export default store;
