import express from 'express'
import { login, protect, signUp } from '../controllers'
import { updateUser, uploadAvatar } from '../controllers/userController'

const userRouter = express.Router()

userRouter.post('/signup', signUp)
userRouter.post('/login', login)
userRouter.patch('/:id', protect, uploadAvatar, updateUser)

export { userRouter }
