import { Request, Response } from 'express'
import { Board } from '../models'

export const createBoard = (req: Request, res: Response): void => {
  Board.create(req.body)
    .then(response => {
      res.status(201).json({
        status: 'Success',
        project: response
      })
    })
    .catch(() => {
      res.status(400).json({
        status: 'Failure',
        message: 'Something went wrong while trying to create board!'
      })
    })
}

export const getBoardsByProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const boards = await Board.find({ project: req.params.id })

    res.status(200).json({
      status: 'Success',
      boards
    })
  } catch {
    res.status(400).json({
      status: 'Failure',
      message: 'Project doesn\'t have any boards!'
    })
  }
}

export const updateBoard = (req: Request, res: Response): void => {
  Board.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })
    .then(response => {
      res.status(201).json({
        status: 'Success',
        project: response
      })
    })
    .catch(() => {
      res.status(400).json({
        status: 'Failure',
        message: 'Something went wrong while trying to update board!'
      })
    })
}

export const deleteBoard = (req: Request, res: Response): void => {
  Board.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).json({
        status: 'Success',
        project: null
      })
    })
    .catch(() => {
      res.status(400).json({
        status: 'Failure',
        message: 'Something went wrong while trying to delete board!'
      })
    })
}
