const passport = require('passport')

// import our user model
const User = require('../../models/User')

// import our strategies
require('./google')(passport)

// quick read on serializeUser and deserializeUser
// https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize#answer-27637668
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user))
})
