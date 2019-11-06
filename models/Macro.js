module.exports = (sequelize, DataTypes) => {
  const Macro = sequelize.define(
    'Macro',
    {
      name: DataTypes.STRING,
      macro: DataTypes.STRING,
    },
    {}
  )

  Macro.associate = models => {
    Macro.belongsTo(models.User)
  }

  return Macro
}
