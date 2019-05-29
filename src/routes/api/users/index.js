const router = require('express').Router()

// models
const User = require('../../../models/User')

router.route('/').get(async (req, res, next) => {
  const users = await User.find().catch(next)
  if (!users) return res.status(404).send('No users found')
  return res.send(users)
})

router.use('/:userId', require('./user'))

module.exports = router
