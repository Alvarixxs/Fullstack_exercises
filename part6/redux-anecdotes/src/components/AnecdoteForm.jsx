import {useDispatch} from "react-redux";

function AnecdoteForm() {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch({type: 'anecdote/createAnecdote', payload: content})
    event.target.anecdote.value = ''
    dispatch({type: 'message/messageSet', payload: 'you created the anecdote \''+ content + '\''})
    setTimeout(() => dispatch({type: 'message/messageRemove'}), 5000)
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