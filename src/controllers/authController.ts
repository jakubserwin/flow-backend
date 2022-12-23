import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'
import { NextFunction, Request, Response } from 'express'
import config from '../config'
import { User } from '../models'
import { TokenInterface } from 'src/types'

const signToken = (id: Types.ObjectId): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

export const signUp = (req: Request, res: Response): void => {
  User.create(req.body)
    .then(response => {
      const token = signToken(response._id)

      res.status(201).json({
        status: 'Success',
        token,
        user: response
      })
    })
    .catch(() => {
      res.status(400).json({
        status: 'Failure',
        message: 'Invalid signUp data'
      })
    })
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body

    if (email === '' || password === '') {
      res.status(400).json({
        status: 'Failure',
        message: 'Empty values provided'
      })
      return
    }

    const user = await User.findOne({ email }).select('+password')

    if ((user == null) || !(await user.verifyPassword(password))) {
      res.status(400).json({
        status: 'Failure',
        message: 'Invalid email or password',
        user,
        find: User.findOne({ email })
      })
      return
    }

    const token = signToken(user._id)
    res.status(201).json({
      status: 'Success',
      token,
      user
    })
  } catch {
    res.status(400).json({
      status: 'Failure',
      message: 'Something went wrong'
    })
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token: string = ''

    const { authorization } = req.headers

    if (authorization !== undefined && authorization !== null) {
      token = authorization.startsWith('Bearer') ? authorization.split(' ')[1] : ''
    }

    if (token === '') {
      res.status(401).json({
        status: 'Failure',
        message: 'You are not logged in!'
      })
      return
    }

    // 2) Verification token
    const decoded = jwt.verify(token, config.jwtSecret) as TokenInterface

    // 3) Check if user still exists
    const isUser = await User.findById(decoded.id)
    if (isUser == null) {
      res.status(401).json({
        status: 'Failure',
        message: 'User no longer exists!'
      })
      return
    }

    next()
  } catch (err) {
    res.status(400).json({
      status: 'Failure',
      message: 'Something went wrong!'
    })
  }
}
