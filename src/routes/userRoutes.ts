import express from 'express'
import { login, protect, signUp, getMembers } from '../controllers'

const userRouter = express.Router()

userRouter.post('/signup', signUp)
userRouter.post('/login', login)
// userRouter.patch('/:id', protect, updateUser)
userRouter.get('/:id', protect, getMembers)

export { userRouter }
