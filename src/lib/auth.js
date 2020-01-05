import bcrypt from 'bcrypt'

import models from '../models'

export const authenticateUser = async (email, password) => {
  email = email.trim().toLowerCase()
  const user = await models.User.findOne({ where: { email } })

  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      return user
    }
  }
  return Error('User authentication failed.')
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
