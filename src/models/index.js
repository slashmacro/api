import Sequelize from 'sequelize'

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  }
)

const models = {
  User: sequelize.import('./user'),
  Macro: sequelize.import('./macro'),
}

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models)
  }
})

export { sequelize }

export { default as User } from './user'
export { default as Macro } from './macro'

export default models
