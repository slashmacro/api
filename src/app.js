import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport'
import * as Sentry from '@sentry/node'
import socketio from 'socket.io'

import { sequelize } from './models'

// ROUTES
import { api, auth } from './routes'

const app = express()
const port = process.env.PORT || 8000

if (process.env.NODE_ENV === 'production') {
  Sentry.init({ dsn: process.env.SENTRY_DSN })
}

// MIDDLEWARE
// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler())

// CORS
app.use(cors())

// BODY PARSER
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// COOKIE PARSER
app.use(cookieParser())

// Session Store
const SequelizeStore = require('connect-session-sequelize')(session.Store)

// SESSION
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new SequelizeStore({ db: sequelize }),
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      // set cookie age to two weeks
      maxAge: 1000 * 60 * 60 * 24 * 14,
      secure: false,
    },
  })
)

// sync
sequelize.sync()

// PASSPORT
app.use(passport.initialize())
app.use(passport.session())
require('./middleware/passport')

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler())

// ROUTES
app.use('/api', api)
app.use('/auth', auth)

const server = app.listen(port, () => console.log(`Now listening on ${port}`))

// SOCKET.io
const io = socketio(server)

io.on('connection', socket => {
  console.log('user connected')
  socket.on('disconnect', () => console.log('user disconnected'))
})

export default app
