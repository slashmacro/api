const express = require('express')
const session = require('express-session')
const app = express()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
const passport = require('passport')

// BODY PARSER
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// COOKIE PARSER
app.use(cookieParser())

// CORS
app.use(cors())

// EXPRESS SESSION
app.use(
  session({
    secret: process.env.SECRET,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    }),
    resave: true,
    saveUninitialized: true,
    cookie: {
      // max age: days, hours, minutes, seconds, milliseconds
      maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day / 24 hours
    }
  })
)

// PASSPORT
app.use(passport.initialize())
app.use(passport.session())
require('./middleware/passport')

// ROUTER
app.use('/auth', require('./routes/auth'))
// app.use('/api', require('./routes/api'))

module.exports = app
