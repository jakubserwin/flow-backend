import express from 'express'
import { createProject, protect } from '../controllers'

const projectRouter = express.Router()

projectRouter
  .route('/')
  .post(protect, createProject)

export { projectRouter }
