import express from 'express'
import { createProject, deleteProject, getProjectsByUser, protect } from '../controllers'
import { updateProject } from '../controllers/projectController'

const projectRouter = express.Router()

projectRouter
  .route('/')
  .post(protect, createProject)

projectRouter
  .route('/:id')
  .get(protect, getProjectsByUser)
  .patch(protect, updateProject)
  .delete(protect, deleteProject)

export { projectRouter }
