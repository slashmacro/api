export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: DataTypes.STRING,
    admin: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    displayName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
  })

  User.associate = models => {
    User.hasMany(models.Macro)
  }

  return User
}
