import express from 'express'
import {
  addMember,
  createProject,
  deleteProject,
  getProjectsByUser,
  protect,
  updateProject
} from '../controllers'

const projectRouter = express.Router()

projectRouter
  .route('/')
  .post(protect, createProject)

projectRouter
  .route('/:id')
  .post(protect, addMember)
  .get(protect, getProjectsByUser)
  .patch(protect, updateProject)
  .delete(protect, deleteProject)

export { projectRouter }
