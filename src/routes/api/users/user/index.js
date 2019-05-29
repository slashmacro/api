const router = require('express').Router({ mergeParams: true })

// models
const User = require('../../../../models/User')

router.route('/').get(async (req, res, next) => {
  const user = await User.findById(req.params.userId).catch(next)
  if (!user) res.status(404).send('No user found')
  return res.send(user)
})

module.exports = router
