import express from 'express'
import * as Sentry from '@sentry/node'

// ROUTES
import { api, auth } from './routes'

const app = express()
const port = process.env.PORT || 8000

Sentry.init({ dsn: process.env.SENTRY_DSN })

// ROUTES
app.use('/api', api)
app.use('/auth', auth)

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler())

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler())

app.listen(port, () => console.log(`Now listening on ${port}`))

export default app
