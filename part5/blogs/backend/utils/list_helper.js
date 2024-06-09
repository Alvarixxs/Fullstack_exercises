const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total+blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0){
    return null
  }
  let blog = blogs.find((blog)=>blog.likes === Math.max(...blogs.map(blog => blog.likes)))

  return {title: blog.title, author: blog.author, likes: blog.likes};
}

const mostBlogs = (blogs) => {
  let map = {}

  if (blogs.length === 0) {
    return null
  }

  blogs.forEach(blog => {
    if (map[blog.author] === undefined) {
      map[blog.author] = {}
      map[blog.author].author = blog.author
      map[blog.author].blogs = 0
    }
    map[blog.author].blogs++
  })

  return map[
    Object.keys(map).find((author) => {
      return map[author].blogs === Math.max(
        ...Object.keys(map).map(author => {
          return map[author].blogs
        })
      )
    })
    ]
}

const mostLikes = (blogs) => {
  let map = {}

  if (blogs.length === 0) {
    return null
  }

  blogs.forEach(blog => {
    if (map[blog.author] === undefined) {
      map[blog.author] = {}
      map[blog.author].author = blog.author
      map[blog.author].likes = 0
    }
    map[blog.author].likes+=blog.likes
  })

  return map[
    Object.keys(map).find((author) => {
      return map[author].likes === Math.max(
        ...Object.keys(map).map(author => {
          return map[author].likes
        })
      )
    })
    ]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}