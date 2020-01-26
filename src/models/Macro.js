const macro = (sequelize, DataTypes) => {
  const Macro = sequelize.define('Macro', {
    name: DataTypes.STRING,
    icon: DataTypes.STRING,
    body: DataTypes.JSON,
  })

  Macro.associate = models => {
    Macro.belongsTo(models.User)
  }

  return Macro
}

export default macro
