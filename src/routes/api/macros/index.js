import { Router } from 'express'

import models from '../../../models'
import { isAuthenticated } from '../../../lib/auth'

const router = Router()

// * ROUTES ARE PREPENDED WITH /api/macros

router.get('/', (req, res) => {
  return models.Macro.findAll().then(macros => res.send(macros))
})

router.post('/', isAuthenticated, (req, res) => {
  const { name } = req.body
  const { id: UserId } = req.user

  const data = { ...req.body, UserId }

  if (!name) return res.sendStatus(400)
  return models.Macro.create(data)
    .then(macro => res.send(macro))
    .catch(err => res.status(500).send(err))
})

router.get('/:id', (req, res) => {
  const { id } = req.params

  models.Macro.findByPk(id)
    .then(macro => {
      if (!macro) return res.sendStatus(404)
      return res.send(macro)
    })
    .catch(err => res.status(500).send(err))
})

router.patch('/:id', isAuthenticated, (req, res) => {
  const { id } = req.params
  const { is: UserId } = req.user

  models.Macro.findByPk(id)
    .then(macro => {
      console.log(id, macro)
      if (!macro) return res.sendStatus(404)

      // check if the user id matches the creator or if they are an admin
      if (macro.UserId !== UserId && !req.user.admin) return res.sendStatus(401)

      macro.name = req.body?.name || macro.name
      // TODO: declare the rest of the editable properties

      return macro
        .save()
        .then(updatedMacro => res.send(updatedMacro))
        .catch(err => res.status(500).send(err))
    })
    .catch(err => res.status(500).send(err))
})

router.delete('/:id', isAuthenticated, (req, res) => {
  const { id } = req.params
  const { id: UserId } = req.user

  models.Macro.findByPk(id)
    .then(macro => {
      if (!macro) return res.sendStatus(404)

      // check if the user id matches the creator or if they are an admin
      if (macro.UserId !== UserId && !req.user.admin) return res.sendStatus(401)

      // destory the macro
      return macro
        .destroy()
        .then(res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    })
    .catch(err => res.status(500).send(err))
})

export default router
