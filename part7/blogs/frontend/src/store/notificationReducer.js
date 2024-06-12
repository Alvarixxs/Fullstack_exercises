import { createSlice } from "@reduxjs/toolkit";

const notificationReducer = createSlice({
  name: "message",
  initialState: "",
  reducers: {
    notificationSet(state, action) {
      return action.payload;
    },
    notificationRemove() {
      return "";
    },
  },
});

export const setNotification = (message, timeout) => {
  return async (dispatch) => {
    dispatch({ type: "message/notificationSet", payload: message });
    setTimeout(
      () => dispatch({ type: "message/notificationRemove" }),
      timeout * 1000,
    );
  };
};

export default notificationReducer.reducer;
