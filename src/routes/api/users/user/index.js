const router = require('express').Router({ mergeParams: true })

// models
const User = require('../../../../models/User')

router.route('/').get(async (req, res, next) => {
  const { userId } = req.params
  const user = await User.findById(userId).catch(next)
  if (!user) res.status(404).send('No user found')
  return res.send(user)
})

router.use('/macros', require('./macros'))

module.exports = router
