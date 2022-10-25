import { Request, Response } from 'express'
import { Project } from '../models'

export const createProject = (req: Request, res: Response): void => {
  Project.create(req.body)
    .then(response => {
      res.status(201).json({
        status: 'Success',
        project: response
      })
    })
    .catch(() => {
      res.status(400).json({
        status: 'Failure',
        message: 'Something went wrong while trying to create project!'
      })
    })
}
