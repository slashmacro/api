const router = require('express').Router({ mergeParams: true })

// models
const Macro = require('../../../../models/Macro')

router
  .route('/')
  .get(async (req, res, next) => {
    const { macroId } = req.params
    const macro = await Macro.findById(macroId).catch(next)
    if (!macro) return res.status(404).send('No macro found')
    return res.send(macro)
  })
  .patch(async (req, res, next) => {
    const { macroId } = req.params
    const macro = await Macro.findById(macroId).catch(next)
    if (!macro) return res.status(404).send('No macro found')
    return res.send(macro)
  })
  .delete(async (req, res, next) => {
    const { macroId } = req.params
    const macro = await Macro.findById(macroId).catch(next)
    if (!macro) return res.status(404).send('No macro found')
    return macro
      .remove()
      .then(() => res.send('Macro successfully deleted'))
      .catch(next)
  })

module.exports = router
