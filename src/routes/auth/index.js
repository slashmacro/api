import express from 'express'
import passport from 'passport'

import { createUser } from '../../lib/auth'

const router = express.Router()

// * ROUTES ARE PREPENDED WITH /auth

router.get('/session', (req, res) => res.send(req.user))

router.post('/register', (req, res) => {
  return createUser(req.body)
    .then(user => res.send(user))
    .catch(err => res.sendStatus(500).send(err))
})

router.post('/login', passport.authenticate('local', { failWithError: true }))

router.get('/logout', async (req, res) => {
  try {
    await req.logOut()
    return res.sendStatus(200)
  } catch (err) {
    return res.sendStatus(500)
  }
})

export default router
