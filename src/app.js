import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import session from 'express-session'
import passport from 'passport'
import * as Sentry from '@sentry/node'

// database
import { sequelize } from './models'

// passport config
import initializePassport from './config/passport'

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
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// SESSION
app.use(session({ secret: process.env.SESSION_SECRET }))

// PASSPORT
initializePassport(passport)
app.use(passport.initialize())
app.use(passport.session())

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler())

// ROUTES
app.use('/api', api)
app.use('/auth', auth)

sequelize.sync().then(() => {
  app.listen(port, () => console.log(`Now listening on ${port}`))
})

export default app
