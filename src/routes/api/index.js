import express from 'express'

const Router = express.Router()

Router.get('/debug-sentry', (req, res) => {
  throw new Error('My first sentry error')
})

export default Router
