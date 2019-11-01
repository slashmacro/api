require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

// BODYPARSER
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// CORS
app.use(cors())

// MODELS
const models = require('./models')

// test the connection
models.sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err))

// ROUTER
app.use('/auth', require('./routes/auth'))
app.use('/api', require('./routes/api'))

module.exports = app
