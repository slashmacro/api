const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')

const app = express()

// SESSION
app.use(session({ secret: process.env.SESSION_SECRET }))

// BODYPARSER
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// CORS
app.use(cors())

// PASSPORT
app.use(passport.initialize())
app.use(passport.session())

// DATABASE
const { sequelize } = require('./models')

sequelize
  .authenticate()
  .then(() => console.log('Connected to Database'))
  .catch(err => console.log('Error connecting to Datbase:', err))

// ROUTES
app.use('/auth', require('./routes/auth'))
app.use('/api', require('./routes/api'))

module.exports = app
