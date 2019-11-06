exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  return next(new Error(401))
}

exports.destroySession = (req, res) => {
  req.logOut()
  req.session.destroy()
  res.send(200).status('User session destroyed successfully')
}
