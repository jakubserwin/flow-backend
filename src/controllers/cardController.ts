import { Request, Response } from 'express'
import { Card, List } from '../models'

export const createCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, assignee, list } = req.body
    const card = await Card.create({
      name,
      assignee
    })

    await List.updateOne(
      { _id: list },
      { $push: { cards: card } }
    )

    res.status(201).json({
      status: 'Success',
      card
    })
  } catch (err) {
    res.status(400).json({
      status: 'Failure',
      message: 'Something went wrong while trying to create card!'
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
