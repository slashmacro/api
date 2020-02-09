const express = require('express')
const session = require('express-session')
const bearerToken = require('express-bearer-token')
const cors = require('cors')
const bodyParser = require('body-parser')
const socketio = require('socket.io')
const Sentry = require('@sentry/node')

const app = express()
const PORT = process.env.PORT || 8000

if (process.env.NODE_ENV === 'production') {
  Sentry.init({ dsn: process.env.SENTRY_DSN })
}

// the request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler())

// the error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bearerToken())
app.use(cors())
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
)

const { sequelize } = require('./models')

sequelize.sync()

app.use('/auth', require('./routes/auth'))
app.use('/api', require('./routes/api'))

const server = app.listen(PORT, () => console.log(`Now listening on ${PORT}`))

// SOCKET.IO
const io = socketio(server)

io.on('connection', socket => {
  console.log('user connect')
  socket.on('disconnect', () => console.log('user disconnected'))
})

module.exports = app
