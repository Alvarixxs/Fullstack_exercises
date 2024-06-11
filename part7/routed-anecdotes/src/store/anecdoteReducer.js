import { createSlice } from '@reduxjs/toolkit'
const anecdotes = [
  {
    content: 'If it hurts, do it more often',
    author: 'Jez Humble',
    info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
    votes: 0,
    id: 1
  },
  {
    content: 'Premature optimization is the root of all evil',
    author: 'Donald Knuth',
    info: 'http://wiki.c2.com/?PrematureOptimization',
    votes: 0,
    id: 2
  }
]

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: anecdotes,
  reducers: {
    voteTo(state, action) {
      return state.forEach((anecdote) => {
        if (anecdote.id === action.payload) {
          anecdote.votes += 1
        }
      })
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const createAnecdote = (object) => {
  return async dispatch => {
    dispatch({type: 'anecdote/createAnecdote', payload: {...object, id: getId()}})
  }
}

export default anecdoteSlice.reducer