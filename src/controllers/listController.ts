import { Request, Response } from 'express'
import { List } from '../models'

export const createList = (req: Request, res: Response): void => {
  List.create(req.body)
    .then(response => {
      res.status(201).json({
        status: 'Success',
        list: response
      })
    })
    .catch((error) => {
      res.status(400).json({
        status: 'Failure',
        message: 'Something went wrong while trying to create list!',
        error
      })
    })
}

export const getListsByBoard = async (req: Request, res: Response): Promise<void> => {
  try {
    const lists = await List.find({ board: req.params.id }).sort('order').populate({
      path: 'cards',
      populate: {
        path: 'assignee'
      }
    })

    res.status(200).json({
      status: 'Success',
      lists
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failure',
      message: 'Something went wrong while trying to get list!',
      error
    })
  }
}

export const updateList = async (req: Request, res: Response): Promise<void> => {
  try {
    const list = await List.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate({
      path: 'cards',
      populate: {
        path: 'assignee'
      }
    })

    res.status(201).json({
      status: 'Success',
      list
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failure',
      message: 'Something went wrong while trying to update list!',
      error
    })
  }
}

export const deleteList = async (req: Request, res: Response): Promise<void> => {
  try {
    await List.findByIdAndDelete(req.params.id)

    res.status(204).json({
      status: 'Success',
      list: null
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failure',
      message: 'Something went wrong while trying to delete list!',
      error
    })
  }
}
