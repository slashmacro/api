module.exports = (sequelize, DataTypes) => {
  const Macro = sequelize.define(
    'Macro',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      icon: DataTypes.STRING,
      macro: DataTypes.STRING,
    },
    {}
  )
  Macro.associate = models => {
    Macro.hasMany(models.Macro)
  }

  return Macro
}
