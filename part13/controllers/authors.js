const router = require('express').Router()
const { Blog } = require('../models')
const User = require('../models/user')
const {sequelize} = require("../util/db");

router.get('/', async (req, res) => {
  const authors = await Blog.findAll({
    group: 'author',
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('blog')), 'articles'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
    ],
    order: [['likes', 'DESC']]
  })
  res.json(authors)
})

module.exports = router