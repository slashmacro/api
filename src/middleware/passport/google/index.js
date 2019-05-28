// https://console.developers.google.com

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

// import our user model
const User = require('../../../models/User')

const Google = passport => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/redirect'
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id }, (err, user) => {
          if (err) return done(err)
          if (user) return done(null, user)
          return new User({
            name: {
              familyName: profile.name.familyName,
              givenName: profile.name.givenName
            },
            email: profile.emails[0].value,
            photo: profile.photos[0].value,
            googleId: profile.id,
            isAdmin: false
          })
            .save()
            .then(newUser => done(null, newUser))
            .catch(error => done(error))
        })
      }
    )
  )
}

module.exports = Google
