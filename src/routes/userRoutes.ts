import express from 'express'
import { login, protect, signUp, resizeAvatar, updateUser, uploadAvatar, getMembers } from '../controllers'

const userRouter = express.Router()

userRouter.post('/signup', signUp)
userRouter.post('/login', login)
userRouter.patch('/:id', protect, uploadAvatar, resizeAvatar, updateUser)
userRouter.get('/:id', protect, getMembers)

export { userRouter }
