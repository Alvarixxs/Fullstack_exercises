import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from "../services/anecdotes.js";

const messageReducer = createSlice({
  name: 'message',
  initialState: '',
  reducers: {
    messageSet(state, action) {
      return action.payload
    },
    messageRemove() {
      return ''
    }
  }
})

export const setMessage = (message, timeout) => {
  return async dispatch => {
    dispatch({type: 'message/messageSet', payload: message})
    setTimeout(() => dispatch({type: 'message/messageRemove'}), timeout*1000)
  }
}

export default messageReducer.reducer