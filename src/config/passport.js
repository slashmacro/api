import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt'

// models
import models from '../models'

const initialize = passport => {
  const authenticateUser = async (email, password, done) => {
    const user = await models.User.findOne({ where: { email } })

    if (!user) return done(null, false)
    if (await !bcrypt.compare(password, user.password)) return done(null, false)
    return done(null, user)
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((id, done) => {
    models.User.findByPk(id, (err, user) => {
      return done(err, user)
    })
  })
}

export default initialize
