import bcrypt from 'bcrypt'

import models from '../../../models'

const LocalStrategy = require('passport-local').Strategy

const Local = passport => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      console.log('HIT ======>', email, password)
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
}

module.exports = Local
