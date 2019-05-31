const router = require('express').Router()

// models
const Macro = require('../../../models/Macro')
const User = require('../../../models/User')

router
  .route('/')
  .get(async (req, res, next) => {
    const macros = await Macro.find()
      .populate('createdBy')
      .catch(next)
    if (!macros) return res.status(404).send('No macros were found')
    return res.send(macros)
  })
  .post((req, res, next) => {
    new Macro({
      createdBy: req.user.id,
      ...req.body
    })
      .save()
      .then(async newMacro => {
        const user = await User.findById(req.user.id).catch(next)
        if (!user) return res.status(400).send('User not found')

        user.macros.push(newMacro._id)
        user.save()

        return res.send(newMacro)
      })
      .catch(next)
  })

router.use('/:macroId', require('./macro'))

module.exports = router
