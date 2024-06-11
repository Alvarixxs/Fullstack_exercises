import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => (
          <div key={anecdote.id}>
            <Link to={`${anecdote.id}`}>{anecdote.content}</Link>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default AnecdoteList