const router = require('express').Router()
const { Blog, Activesession} = require('../models')
const User = require('../models/user')
const {Op} = require("sequelize");
const {tokenExtractor} = require("../util/middleware");

router.get('/', async (req, res) => {
  let where = {}

  if (req.query.search) {
    where = {
      [Op.or]: [
        {
          title: {
            [Op.substring]: req.query.search.toLowerCase()
          }
        },
        {
          author: {
            [Op.substring]: req.query.search.toLowerCase()
          }
        }
      ]
    }
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    order: [['likes', 'DESC']],
    where
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const session = await Activesession.findOne({userId: user.id})
    if (!session) {
      return res.status(401).end()
    }
    const blog = await Blog.create({...req.body, userId: user.id})
    return res.json(blog)
  } catch(error) {
    next(error)
  }
})

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', blogFinder, tokenExtractor, async (req, res) => {
  if (req.blog) {
    if (req.decodedToken.id !== req.blog.userId) {
      return res.status(401).end()
    }
    const session = await Activesession.findOne({userId: user.id})
    if (!session) {
      return res.status(401).end()
    }
    await req.blog.destroy()
  }
  res.status(204).end()
})

router.put('/:id', blogFinder, tokenExtractor, async (req, res, next) => {
  try {
    if (req.blog) {
      if (req.decodedToken.id !== req.blog.userId) {
        return res.status(401).end()
      }
      const session = await Activesession.findOne({userId: user.id})
      if (!session) {
        return res.status(401).end()
      }
      req.blog.likes = req.body.likes
      await req.blog.save()
      res.json({likes: req.blog.likes})
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router