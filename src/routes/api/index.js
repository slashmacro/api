const router = require('express').Router()

router.use('/macros', require('./macros'))
router.use('/users', require('./users'))

module.exports = router
