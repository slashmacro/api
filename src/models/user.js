const user = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      admin: DataTypes.BOOLEAN,
    },
    {}
  )
  User.associate = models => {
    User.hasMany(models.Macro)
  }

  return User
}

module.exports = user
