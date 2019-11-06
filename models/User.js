const bcrypt = require('bcryptjs')

const SALT_WORK_FACTOR = 12

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      admin: DataTypes.BOOLEAN,
    },
    {
      classMethods: {
        validPassword: (password, passwd, done, user) => {
          bcrypt.compare(password, passwd, (err, isMatch) => {
            if (err) return done(err, false)
            if (isMatch) return done(null, user)
            return done(null, false)
          })
        },
      },
    }
  )

  User.hook('beforeCreate', (user, next) => {
    const salt = bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => salt)
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err)
      return next(null, user)
    })
  })

  User.associate = models => {
    User.hasMany(models.Macro)
  }

  return User
}
