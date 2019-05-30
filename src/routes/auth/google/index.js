const router = require('express').Router()
const passport = require('passport')
const pt = require('popup-tools')

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
  (req, res) => {
    res.end(pt.popupResponse(req.user))
  }
)

module.exports = router
