const router = require('express').Router()

// USER SESSION
router.get('/sessions', (req, res) => res.send(req.user))

// LOGOUT
router.get('/logout', (req, res) => {
  req.logout()
  res.status(200).send('logout')
})

// GOOGLE
router.use('/google', require('./google'))

module.exports = router
