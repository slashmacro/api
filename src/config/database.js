require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.DATBASE_PASSWORD,
    database: process.env.DATABSE,
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: process.env.DATABASE_USER,
    password: process.env.DATBASE_PASSWORD,
    database: process.env.DATABSE,
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATBASE_PASSWORD,
    database: process.env.DATABSE,
    host: '127.0.0.1',
    dialect: 'postgres',
  },
}
