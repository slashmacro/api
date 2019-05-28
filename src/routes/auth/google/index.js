const router = require('express').Router()
const passport = require('passport')

router.route('/').get(
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  })
)

router.route('/redirect').get(
  passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_URL}/login`
  }),
  (req, res) => res.redirect(process.env.CLIENT_URL)
)

module.exports = router
