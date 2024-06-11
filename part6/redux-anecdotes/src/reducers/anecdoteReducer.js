import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
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
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeNotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({type: 'anecdote/setAnecdotes', payload: anecdotes})
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew({content, votes: 0})
    dispatch({type: 'anecdote/createAnecdote', payload: newAnecdote})
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.update(anecdote.id, {content: anecdote.content, votes: anecdote.votes + 1})
    dispatch({type: 'anecdote/voteTo', payload: newAnecdote.id})
  }
}

export default anecdoteSlice.reducer