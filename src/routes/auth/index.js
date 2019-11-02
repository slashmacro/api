const router = require('express').Router()

router.post('/login', async (req, res) => {
  return res.send('login for user')
})

router.post('/register', async (req, res) => {
  return res.send('register a new user')
})

module.exports = router
