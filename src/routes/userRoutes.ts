import express from 'express'
import { login, signUp } from '../controllers'

const userRouter = express.Router()

userRouter.post('/signup', signUp)
userRouter.post('/login', login)

export { userRouter }
