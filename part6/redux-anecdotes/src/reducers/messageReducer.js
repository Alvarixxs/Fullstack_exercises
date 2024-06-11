import { createSlice } from '@reduxjs/toolkit'

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

export default messageReducer.reducer