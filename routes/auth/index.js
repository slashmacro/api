const router = require('express').Router()
const db = require('../../models')

const { User } = db

router.post('/register', (req, res) => {
  const { email } = req.body
  User.find({ where: { email } }).success(user => {
    if (user) return res.status(400).send()
    return User.create(req.body).error(err =>
      console.log('Error creating new user:', err)
    )
  })
})

module.exports = router
