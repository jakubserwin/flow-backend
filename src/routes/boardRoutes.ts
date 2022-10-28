import express from 'express'
import { createBoard, deleteBoard, getBoardsByProject, protect, updateBoard } from '../controllers'

const boardRouter = express.Router()

boardRouter
  .route('/')
  .post(protect, createBoard)

boardRouter
  .route('/:id')
  .get(protect, getBoardsByProject)
  .patch(protect, updateBoard)
  .delete(protect, deleteBoard)

export { boardRouter }
