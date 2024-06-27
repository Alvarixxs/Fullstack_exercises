const {Activesession} = require("../models");
const router = require('express').Router()

router.delete('/', async (req, res) => {
  const session = await Activesession.findOne({userId: req.body.userId})
  if (session) {
    await session.destroy()
  }
  res.status(204).end()
})

module.exports = router