import express from 'express'

import macros from './macros'
import users from './users'

const Router = express.Router()

// * ROUTES ARE PREPENDED WITH /api

Router.use('/macros', macros)
Router.use('/users', users)

export default Router
