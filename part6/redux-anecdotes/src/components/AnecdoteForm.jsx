import {useDispatch} from "react-redux";
import {createAnecdote} from "../reducers/anecdoteReducer.js";
import {setMessage} from "../reducers/messageReducer.js";

function AnecdoteForm() {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch(createAnecdote(content))
    event.target.anecdote.value = ''
    dispatch(setMessage(`you created the anecdote '${content}'`, 10))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm