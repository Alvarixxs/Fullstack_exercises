import { useState } from 'react'

const Blog = ({ blog, handleLike, ownedByUser, handleDelete }) =>  {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const like = () => {
    handleLike(blog.id, { title: blog.title, author: blog.author, url: blog.url, likes: blog.likes+1 })
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      {visible ? (
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes}
            <button onClick={like}>like</button>
          </div>
          <div>{blog.author}</div>
          {ownedByUser ? (
            <button onClick={() => handleDelete(blog)}>remove</button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export default Blog