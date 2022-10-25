import express from 'express'
import { createProject } from '../controllers'

const projectRouter = express.Router()

projectRouter
  .route('/')
  .post(createProject)

export { projectRouter }
