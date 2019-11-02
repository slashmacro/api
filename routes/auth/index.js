const router = require('express').Router()
const models = require('../../models')

router.post('/login', async (req, res) => {
  return res.send('login for user')
})

router.post('/register', async (req, res) => {
  try {
    const user = await models.User.sync().create(req.body)
    return res.send(user)
  } catch (err) {
    console.log(err)
    return res.send(400)
  }
})

module.exports = router
