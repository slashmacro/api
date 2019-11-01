const macro = (sequelize, DataTypes) => {
  const Macro = sequelize.define(
    'Macro',
    {
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      body: DataTypes.STRING,
      macro: DataTypes.STRING,
    },
    {}
  )

  Macro.associate = models => {
    Macro.belongsTo(models.Macro)
  }

  return Macro
}

module.exports = macro
