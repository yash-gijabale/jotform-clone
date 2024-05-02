import express from 'express'
import formRoute from './formRoutes.js'
import userRouter from './userRoutes.js'
import { checkAuth } from '../middleware/auth.js'
import { getFormById } from '../controller/formController.js'

const routes = express.Router()
routes.use('/api/v1/form/single/:id', getFormById)
routes.use('/api/v1/form', checkAuth, formRoute)
routes.use('/api/v1/user', userRouter)

export default routes