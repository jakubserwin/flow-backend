import express from 'express'
import { protect, createList, getListsByBoard, deleteList, updateList } from '../controllers'

const listRouter = express.Router()

listRouter
  .route('/')
  .post(protect, createList)

listRouter
  .route('/:id')
  .get(protect, getListsByBoard)
  .patch(protect, updateList)
  .delete(protect, deleteList)

export { listRouter }
