import {createAnecdote} from "../store/anecdoteReducer.js";
import {useDispatch} from "react-redux";
import {setNotification} from "../store/notificationReducer.js";
import {useNavigate} from "react-router-dom";
import {useField} from "../hooks/index.js";

const CreateNew = () => {
  const {reset: resetContent, ...content} = useField('text')
  const {reset: resetAuthor, ...author} = useField('text')
  const {reset: resetInfo, ...info} = useField('text')
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createAnecdote({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    }))
    dispatch(setNotification(`a new anecdote '${content.value}' has been added successfully.`, 3))
    navigate('/anecdotes')
  }

  const reset = (event) => {
    event.preventDefault()
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content}/>
        </div>
        <div>
          author
          <input {...author}/>
        </div>
        <div>
          url for more info
          <input {...info}/>
        </div>
        <button>create</button>
        <button onClick={reset}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew