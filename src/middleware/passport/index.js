import passport from 'passport'

import models from '../../models'

// STRATEGIES
require('./local')(passport)

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) => {
  models.User.findByPk(id).then(user => done(null, user))
})
