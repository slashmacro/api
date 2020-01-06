import bcrypt from 'bcrypt'
import { Strategy as LocalStrategy } from 'passport-local'

import models from '../models'

export default passport => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      models.User.findOne({ where: { email } })
        .then(user => {
          if (!user) return done(null, false)
          return bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return done(err)
            if (!isMatch) return done(null, false)
            return done(null, user)
          })
        })
        .catch(err => done(err))
    })
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    models.User.findByPk(id).then(user => done(null, user))
  })
}
