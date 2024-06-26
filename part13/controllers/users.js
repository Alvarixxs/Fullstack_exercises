const router = require('express').Router()

const { User, Blog} = require('../models')
const {Op} = require("sequelize");

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
    }
  })
  res.json(users)
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch(error) {
    next(error)
  }
})

router.get('/:id', async (req, res) => {
  let read = {
    [Op.in]: [true, false]
  }
  if (req.query.read) {
    read = req.query.read === 'true'
  }

  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: [''] } ,
    include:[
      {
        model: Blog,
        attributes: { exclude: ['userId'] }
      },
      {
        model: Blog,
        as: 'readings',
        attributes: { exclude: ['userId']},
        through: {
          attributes: ['id', 'read'],
          where: {
            read
          }
        },
      },
    ]
  })

  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.put('/:id', async (req, res, next) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    try {
      user.username = req.body.username
      await user.save()
      res.json(user)
    } catch(error) {
      next(error)
    }
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    await user.destroy()
  }
  res.status(204).end()
})

module.exports = router