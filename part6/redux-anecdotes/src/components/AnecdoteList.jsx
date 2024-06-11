import {useDispatch, useSelector} from "react-redux";
import {voteTo} from "../reducers/anecdoteReducer.js";

// eslint-disable-next-line react/prop-types
const Anecdote = ({anecdote, handleClick}) => {
  return (
    // eslint-disable-next-line react/prop-types
    <div>
      <div>
        {/* eslint-disable-next-line react/prop-types */}
        {anecdote.content}
      </div>
      <div>
        {/* eslint-disable-next-line react/prop-types */}
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

function AnecdoteList() {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.sort((a,b) => b.votes - a.votes))

  return (
    anecdotes.map(anecdote =>
      <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() => dispatch(voteTo(anecdote.id))}
      ></Anecdote>
    )
  )
}

export default AnecdoteList