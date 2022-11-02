import express from 'express'
import { addOrRemoveMember, createBoard, deleteBoard, getBoardsByProject, protect, updateBoard } from '../controllers'

const boardRouter = express.Router()

boardRouter
  .route('/')
  .post(protect, createBoard)

boardRouter
  .route('/:id')
  .post(protect, addOrRemoveMember)
  .get(protect, getBoardsByProject)
  .patch(protect, updateBoard)
  .delete(protect, deleteBoard)

export { boardRouter }
