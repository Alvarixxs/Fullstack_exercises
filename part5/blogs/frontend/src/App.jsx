import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './app.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setInfoMessage('Wrong credentials')
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)
    }
  }

  const handlenew = async (event) => {
    event.preventDefault()

    try {
      const blog = await blogService.create({
        title, author, url
      })
      setBlogs(blogs.concat(blog))
      setInfoMessage("a new blog " + blog.title + " has been created.")
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)
    } catch (exception) {
      setInfoMessage(exception.response.data.error)
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)
    }
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={handlenew}>
        <div>
          title
          <input type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
    </div>
  )

  const infoDiv = () => {
    return (
      <div className="info">
        {infoMessage}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {infoMessage ? infoDiv() : null}
      {user === null ?
        loginForm() :
        <div>
          <div>{user.name} logged-in <button onClick={handleLogout}>logout</button></div>
          {blogForm()}
        </div>
      }
    </div>
  )
}

export default App