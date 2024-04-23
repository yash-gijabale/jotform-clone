import express from 'express'
import { createUser, login, logout, profile } from '../controller/userController.js'
import { checkAuth } from '../middleware/auth.js'

const userRouter = express.Router()

userRouter.post('/new', createUser)
userRouter.post('/login', login)
userRouter.get('/logout', logout)
userRouter.get('/profile', checkAuth, profile)

export default userRouter