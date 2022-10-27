import { Request, Response } from 'express'
import { Project } from '../models'

export const createProject = (req: Request, res: Response): void => {
  Project.create(req.body)
    .then(response => {
      res.status(201).json({
        status: 'Success',
        project: response
      })
    })
    .catch(() => {
      res.status(400).json({
        status: 'Failure',
        message: 'Something went wrong while trying to create project!'
      })
    })
}

export const getProjectsByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await Project.find({ owner: req.params.id })
    const guestProjects = await Project.find({ members: req.params.id })

    res.status(200).json({
      status: 'Success',
      projects,
      guestProjects
    })
  } catch {
    res.status(400).json({
      status: 'Failure',
      message: 'Provided user doesn\'t have any projects!'
    })
  }
}

export const updateProject = (req: Request, res: Response): void => {
  Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })
    .then(response => {
      res.status(201).json({
        status: 'Success',
        project: response
      })
    })
    .catch(() => {
      res.status(400).json({
        status: 'Failure',
        message: 'Something went wrong while trying to update project!'
      })
    })
}

export const deleteProject = (req: Request, res: Response): void => {
  Project.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).json({
        status: 'Success',
        project: null
      })
    })
    .catch(() => {
      res.status(400).json({
        status: 'Failure',
        message: 'Something went wrong while trying to delete project!'
      })
    })
}
