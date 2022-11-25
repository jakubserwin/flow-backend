import express from 'express'
import {
  protect,
  createCard,
  getCardsByList,
  deleteList
} from '../controllers'

const cardRouter = express.Router()

cardRouter
  .route('/')
  .post(protect, createCard)

cardRouter
  .route('/:id')
  .get(protect, getCardsByList)
  // .patch(protect, updateProject)
  .delete(protect, deleteList)

export { cardRouter }
