const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const db = require('../models')

// SERIALIZE SESSION
passport.serializeUser((user, done) => {
  done(null, user)
})

// DESERIALIZE SESSIONS
passport.deserializeUser(({ id }, done) => {
  db.User.find({ where: { id } })
    .success(user => done(null, user))
    .error(err => done(err, null))
})

// AUTH
passport.use(
  new LocalStrategy((username, password, done) => {
    db.User.find({ where: { username } })
      .success(user => {
        const passwd = user ? user.password : ''
        const isMatch = db.User.validPassword(password, passwd, done, user)
      })
      .error(err => done(err, null))
  })
)
