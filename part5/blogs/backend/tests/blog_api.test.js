const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

describe('when there is initially some blogs saved', ()=> {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)

    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({username: 'root', passwordHash})

    await user.save()
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blog contain the unique id property', async () => {
    const savedBlogs = await helper.blogsInDb()
    const keys = Object.keys(savedBlogs[0])
    assert(keys.includes('id'))
  })

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('the first blog has the author Michael Chan', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(e => e.author)
    assert(contents.includes('Michael Chan'))
  })

  describe('addition of a blog', ()=> {
    test('a blog cannot be added without authorizatuib', async () => {
      const newBlog = {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
    })

    test('a valid blog can be added', async () => {
      const response = await api
        .post('/api/login')
        .send({username: 'root', password: 'sekret'})

      const newBlog = {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
      }

      await api
        .post('/api/blogs')
        .auth(response.body.token, {type: 'bearer'})
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const contents = blogsAtEnd.map(n => n.title)
      assert(contents.includes("TDD harms architecture"))
    })

    test('like property defaults to zero', async () => {
      const response = await api
        .post('/api/login')
        .send({username: 'root', password: 'sekret'})

      const newBlog = {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      }

      await api
        .post('/api/blogs')
        .auth(response.body.token, {type: 'bearer'})
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const blog = blogsAtEnd.find((blog) => blog.title === newBlog.title)
      assert.strictEqual(blog.likes, 0)
    })

    test('title or url missing implies bad request', async () => {
      const response = await api
        .post('/api/login')
        .send({username: 'root', password: 'sekret'})

      const newBlog = {
        author: "Robert C. Martin",
      }

      await api
        .post('/api/blogs')
        .auth(response.body.token, {type: 'bearer'})
        .send(newBlog)
        .expect(400)
    })
  })

  describe('update a blog', ()=>{
    test('blog updates correctly for valid info', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogtoUpdate = blogsAtStart[0]
      blogtoUpdate.title='updated blog'

      await api
        .put(`/api/blogs/${blogtoUpdate.id}`)
        .send(blogtoUpdate)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

      const contents = blogsAtEnd.map(r => r.title)
      assert(contents.includes(blogtoUpdate.title))
    })

    test('blog does not update for invalid info',async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogtoUpdate = blogsAtStart[0]
      blogtoUpdate.title = ''
      blogtoUpdate.url = ''

      await api
        .put(`/api/blogs/${blogtoUpdate.id}`)
        .send(blogtoUpdate)
        .expect(400)
    })
  })

  describe('deletion of a blog', ()=> {
    test('succeeds for a valid id',async () => {
      const response = await api
        .post('/api/login')
        .send({username: 'root', password: 'sekret'})

      const newBlog = {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
      }

      const request = await api
        .post('/api/blogs')
        .auth(response.body.token, {type: 'bearer'})
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogToDelete = request.body

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .auth(response.body.token, {type: 'bearer'})
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      const contents = blogsAtEnd.map(r => r.title)
      assert(!contents.includes(blogToDelete.title))
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})