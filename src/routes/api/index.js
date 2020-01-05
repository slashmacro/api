import express from 'express'

const Router = express.Router()

Router.get('/debug-sentry', () => {
  throw new Error('My first sentry error')
})

export default Router
