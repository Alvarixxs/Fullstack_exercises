import {configureStore} from "@reduxjs/toolkit";
import anecdoteReducer from "./reducers/anecdoteReducer.js";
import filterReducer from "./reducers/filterReducer.js";
import messageReducer from "./reducers/messageReducer.js";

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    message: messageReducer,
  }
})

export default store