import { Router } from 'express'

import models from '../../../models'
import { isAuthenticated } from '../../../lib/auth'

const router = Router()

// * ROUTES ARE PREPENDED WITH /api/users

router.get('/', (req, res) => {
  models.User.findAll()
    .then(users => res.send(users))
    .catch(err => res.status(500).send(err))
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  models.User.findByPk(id)
    .then(user => {
      if (!user) return res.sendStatus(404)
      return res.send(user)
    })
    .catch(err => res.status(500).send(err))
})

router.patch('/:id', isAuthenticated, (req, res) => {
  const { id } = req.params
  const { id: UserId, admin } = req.user

  models.User.findByPk(id)
    .then(user => {
      if (!user) res.sendStatus(404)
      if (user.id !== UserId && !admin) res.sendStatus(401)

      user.email = req.body?.email || user.email
      user.username = req.body?.username || user.username
      // TODO: add other update values

      return user
        .save()
        .then(updatedUser => res.send(updatedUser))
        .catch(err => res.status(500).send(err))
    })
    .catch(err => res.status(500).send(err))
})

router.delete('/:id', isAuthenticated, (req, res) => {
  const { id } = req.params
  const { id: UserId, admin } = req.user

  models.User.findByPk(id)
    .then(user => {
      if (!user) res.sendStatus(404)
      if (user.id !== UserId && !admin) res.sendStatus(401)

      user.email = req.body?.email || user.email
      user.username = req.body?.username || user.username
      // TODO: add other update values

      return user
        .destroy()
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    })
    .catch(err => res.status(500).send(err))
})

export default router
