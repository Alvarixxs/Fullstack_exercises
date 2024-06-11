import {configureStore} from "@reduxjs/toolkit";
import anecdoteReducer from "./anecdoteReducer.js";
import notificationReducer from "./notificationReducer.js";

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
  }
})

export default store