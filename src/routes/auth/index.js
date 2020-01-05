import express from 'express'
import passport from 'passport'

import { createUser } from '../../lib/auth'

const Router = express.Router()

// * ROUTES ARE PREPENDED WITH /api

Router.post('/register', (req, res) => {
  return createUser(req.body)
    .then(user => res.send(user))
    .catch(err => res.sendStatus(500).send(err))
})

Router.post('/login', passport.authenticate('local'))

Router.post('/logout', async (req, res) => {
  try {
    await req.logOut()
    return res.sendStatus(200)
  } catch (err) {
    return res.sendStatus(500)
  }
})

export default Router
