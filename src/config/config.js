module.exports = {
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
  },
  test: {
    username: 'zachbharris',
    password: 'slashmacro',
    database: 'slashmacro_backend',
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    logging: false,
    dialectOptions: { ssl: true },
  },
}
