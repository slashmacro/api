const util = require('util')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const models = require('../models')

const signJWT = util.promisify(jwt.sign)

const getUser = token => {
  return new Promise(resolve => {
    jwt.verify(token, process.env.SESSION_SECRENT, {}, (err, payload) => {
      if (err) {
        console.log('Error getting user:', err)
        return resolve(null)
      }

      const { userId } = payload

      return models.User.findByPk(userId)
        .then(user => resolve(user))
        .catch(() => resolve(null))
    })
  })
}

const authorizeAccess = async token => {
  const user = await getUser(token)

  if (!user) return false
  return true
}

const createToken = async (userId, email) => {
  const token = await signJWT({ userId, email }, process.env.SESSION_SECRENT, {
    expiresIn: '2w',
  })

  return token
}

const authenticateUser = async (email = '', password = '') => {
  let token = null

  try {
    email = email.trim().toLowerCase()

    const user = await models.findOne({ where: { email } })

    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        token = await createToken(user.id, user.email)
      }
    }
  } catch (err) {
    console.log('AUTHENTICATE ERROR:', err)
  }

  return token
}

const createUser = async opts => {
  let { name, email, password } = opts

  email = (email || '').trim().toLowerCase()
  name = (name || '').trim()
  password = (password || '').trim()

  if (!name || !email || !password) throw new Error('Missing field')

  password = await bcrypt.hash(password, 10)

  const existingUser = await models.User.findOne({ where: { email } })

  if (existingUser) {
    const err = new Error('Email is already in use')
    err.errors = { email: 'Already in use' }
    throw err
  }

  const user = await models.User.create({ name, email, password })

  return user
}

module.exports = {
  getUser,
  authorizeAccess,
  createToken,
  authenticateUser,
  createUser,
}
