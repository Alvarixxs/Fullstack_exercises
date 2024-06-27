const router = require('express').Router()

const {ReadingList, Activesession} = require('../models')
const {tokenExtractor} = require("../util/middleware");

router.post('/', async (req, res, next) => {
  try {
    const readingList = await ReadingList.create(req.body)
    res.json(readingList)
  } catch(error) {
    next(error)
  }
})

router.put('/:id', tokenExtractor, async (req, res, next) => {
  const readinglist = await ReadingList.findByPk(req.params.id)
  if (readinglist) {
    if (readinglist.userId !== req.decodedToken.id) {
      return res.status(401).end()
    }
    const session = await Activesession.findOne({userId: user.id})
    if (!session) {
      return res.status(401).end()
    }
    try {
      readinglist.read = req.body.read
      await readinglist.save()
      res.json(readinglist)
    } catch(error) {
      next(error)
    }
  } else {
    res.status(404).end()
  }
})

module.exports = router