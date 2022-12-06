import express from 'express'
import {
  protect,
  createCard,
  deleteCard,
  updateCard
} from '../controllers'

const cardRouter = express.Router()

cardRouter
  .route('/')
  .post(protect, createCard)

cardRouter
  .route('/:id')
  .patch(protect, updateCard)
  .delete(protect, deleteCard)

export { cardRouter }
