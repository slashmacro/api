module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    return queryInterface.createTable('Users', {
      username: {
        type: Sequelize.STRING,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: Sequelize.STRING,
      admin: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
      displayName: Sequelize.STRING,
      firstName: Sequelize.STRING,
      lastName: Sequelize.STRING,
    })
  },
}
