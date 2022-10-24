import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'
import { Request, Response } from 'express'
import { User } from '../models'

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
        data: {
          user: response
        }
      })
    })
    .catch(() => {
      res.status(400).json({
        status: 'Failure',
        message: 'Invalid signUp data'
      })
    })
}

export const login = (req: Request, res: Response): void => {
  const { email, password } = req.body

  if (email === '' || password === '') {
    res.status(400).json({
      status: 'Failure',
      message: 'Empty values provided'
    })
    return
  }

  User.findOne({ email })
    .select('+password')
    .then(response => {
      if (response !== null) {
        response
          .verifyPassword(password)
          .then(result => {
            if (!result) {
              res.status(400).json({
                status: 'Failure',
                message: 'Invalid email or password'
              })
              return
            }
            const token = signToken(response._id)
            res.status(201).json({
              status: 'Success',
              token
            })
          })
          .catch(() => {
            res.status(400).json({
              status: 'Failure',
              message: 'Something went wrong'
            })
          })
      }
    })
    .catch(() => {
      res.status(400).json({
        status: 'Failure',
        message: 'Something went wrong'
      })
    })
}
