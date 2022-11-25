import { Request, Response } from 'express'
import { Card } from '../models'

export const createCard = (req: Request, res: Response): void => {
  Card.create(req.body)
    .then(response => {
      res.status(201).json({
        status: 'Success',
        card: response
      })
    })
    .catch(() => {
      res.status(400).json({
        status: 'Failure',
        message: 'Something went wrong while trying to create card!'
      })
    })
}

export const getCardsByList = async (req: Request, res: Response): Promise<void> => {
  try {
    const cards = await Card.find({ list: req.params.id })

    res.status(200).json({
      status: 'Success',
      cards
    })
  } catch {
    res.status(400).json({
      status: 'Failure',
      message: 'Provided list doesn\'t have any cards!'
    })
  }
}

// export const updateList = (req: Request, res: Response): void => {
//   List.findByIdAndUpdate(req.params.id, req.body, {
//     new: true
//   })
//     .then(response => {
//       console.log(response)
//       res.status(201).json({
//         status: 'Success',
//         list: response
//       })
//     })
//     .catch(() => {
//       res.status(400).json({
//         status: 'Failure',
//         message: 'Something went wrong while trying to update list!'
//       })
//     })
// }

export const deleteCard = async (req: Request, res: Response): Promise<void> => {
  try {
    await Card.findByIdAndDelete(req.params.id)

    res.status(204).json({
      status: 'Success',
      card: null
    })
  } catch {
    res.status(400).json({
      status: 'Failure',
      message: 'Something went wrong while trying to delete card!'
    })
  }
}
