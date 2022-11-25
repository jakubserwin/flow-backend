import express from 'express'
import {
  protect,
  createCard,
  deleteCard
} from '../controllers'

const cardRouter = express.Router()

cardRouter
  .route('/')
  .post(protect, createCard)

cardRouter
  .route('/:id')
  // .patch(protect, updateProject)
  .delete(protect, deleteCard)

export { cardRouter }
