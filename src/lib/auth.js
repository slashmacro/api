import bcrypt from 'bcrypt'

import models from '../models'

export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  return res.sendStatus(401)
}

export const createUser = async opts => {
  let { username, password, email } = opts

  // trim strings and force email to be lowercase
  email = (email || '').trim().toLowerCase()
  username = (username || '').trim()
  password = (password || '').trim()

  // hash password
  password = await bcrypt.hash(password, 10)

  // create new user
  const newUser = await models.User.create({ username, password, email })

  return newUser
}
