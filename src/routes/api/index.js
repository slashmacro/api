import express from 'express'

import macros from './macros'

const Router = express.Router()

// * ROUTES ARE PREPENDED WITH /api

Router.use('/macros', macros)

export default Router
