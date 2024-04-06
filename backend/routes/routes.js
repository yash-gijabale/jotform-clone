import express from 'express'
import formRoute from './formRoutes.js'

const routes = express.Router()

routes.use('/api/v1/form', formRoute)

export default routes