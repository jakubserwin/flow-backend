import { Request, Response } from 'express'
import { Card, List } from '../models'

export const createCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, assignee, list, order } = req.body
    const card = await Card.create({
      name,
      assignee,
      order
    })

    await List.updateOne(
      { _id: list },
      { $push: { cards: card } }
    )

    res.status(201).json({
      status: 'Success',
      card
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failure',
      message: 'Something went wrong while trying to create card!',
      error
    })
  }
}

export const updateCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(201).json({
      status: 'Success',
      card
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failure',
      message: 'Something went wrong while trying to update card!',
      error
    })
  }
}

export const deleteCard = async (req: Request, res: Response): Promise<void> => {
  try {
    await Card.findByIdAndDelete(req.params.id)

    res.status(204).json({
      status: 'Success',
      card: null
    })
  } catch (error) {
    res.status(400).json({
      status: 'Failure',
      message: 'Something went wrong while trying to delete card!',
      error
    })
  }
}
