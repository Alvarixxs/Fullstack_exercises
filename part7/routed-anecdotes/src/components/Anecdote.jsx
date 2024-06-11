import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

const Anecdote = () => {
  const { id } = useParams()
  const anecdote = useSelector(state => state.anecdotes.find((anecdote) => anecdote.id.toString() === id))

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>has {anecdote.votes} votes</div>
      <div>for more info see <a href={anecdote.info}>{anecdote.info}</a></div>
    </div>
  )
}

export default Anecdote