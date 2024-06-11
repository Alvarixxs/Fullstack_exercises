import {useDispatch, useSelector} from "react-redux";

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
  const anecdotes =
    useSelector(state =>
      [...state.anecdotes]
        .filter((anecdote) =>
          anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
        )
        .sort((a,b) =>
          b.votes - a.votes
        )
    )

  const voteTo = (anecdote) => {
    dispatch({type: 'anecdote/voteTo', payload: anecdote.id})
    dispatch({type: 'message/messageSet', payload: 'you voted \'' + anecdote.content + '\''})
    setTimeout(() => dispatch({type: 'message/messageRemove'}), 5000)
  }

  return (
    anecdotes.map(anecdote =>
      <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() => voteTo(anecdote)}
      ></Anecdote>
    )
  )
}

export default AnecdoteList