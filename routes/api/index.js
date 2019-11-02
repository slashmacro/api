const router = require('express').Router()

router.get('/', (req, res) => {
  res.send('API: Hello World')
})

module.exports = router
