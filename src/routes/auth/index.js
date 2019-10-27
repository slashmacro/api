const router = require('express').Router()

router.get('/', (req, res) => {
  res.send('SERVER: Hello World')
})

module.exports = router
