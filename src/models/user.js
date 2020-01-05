const user = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
  })

  User.associate = models => {
    User.hasMany(models.Macro)
  }

  return User
}

export default user
