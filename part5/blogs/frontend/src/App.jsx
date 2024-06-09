import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './app.css'
import LoginForm from './components/LoginForm.jsx'
import BlogForm from './components/BlogForm.jsx'
import Togglable from './components/Togglable.jsx'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)

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

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setInfoMessage('Wrong credentials')
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    try {
      const blog = await blogService.create(blogObject)
      console.log(blog)
      setBlogs(blogs.concat(blog))
      setInfoMessage('a new blog ' + blog.title + ' has been created.')
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)
    } catch (exception) {
      setInfoMessage(exception.response.data.error)
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const handleLike = async (id, blogObject) => {
    await blogService.update(id, blogObject)
    const newBlogs = [...blogs]
    newBlogs.forEach((blog) => {
      if (blog.id===id) {
        blog.likes++
      }
    })
    setBlogs(newBlogs)
  }

  const handleDelete = async (blogObject) => {
    if (window.confirm('Remove ' + blogObject.title + ' by ' + blogObject.author + '?')) {
      await blogService.remove(blogObject.id)
      const newBlogs = [...blogs]
      setBlogs(newBlogs.filter(blog => blog.id !== blogObject.id))
    }
  }

  const blogFormRef = useRef()

  const sortedBlogs = blogs.sort((a, b) => b.likes-a.likes)

  return (
    <div>
      <h2>blogs</h2>
      {infoMessage ? <InfoDiv infoMessage={infoMessage}></InfoDiv> : null}
      {user === null ? (
        <Togglable buttonLabel='login'>
          <LoginForm handleLogin={handleLogin}></LoginForm>
        </Togglable>
      ) : (
        <div>
          <div>{user.name} logged-in <button onClick={handleLogout}>logout</button></div>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog}></BlogForm>
          </Togglable>
          {sortedBlogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleLike={handleLike} ownedByUser={blog?.user?.username===user.username} handleDelete={handleDelete}/>
          )}
        </div>
      )}
    </div>
  )
}

const InfoDiv = ({ infoMessage }) => {
  return (
    <div className="info">
      {infoMessage}
    </div>
  )
}

export default App