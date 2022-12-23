import { Request, Response } from 'express'
import { sendEmail } from '../utils'
import { Project, Board, User } from '../models'
import pug from 'pug'
import path from 'path'
// import { fileURLToPath } from 'url'

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
    const projects = await Project.find({ owner: req.params.id }).populate('members')
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

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    await Project.findByIdAndDelete(req.params.id)
    await Board.deleteMany({ project: req.params.id })

    res.status(204).json({
      status: 'Success',
      project: null
    })
  } catch {
    res.status(400).json({
      status: 'Failure',
      message: 'Something went wrong while trying to delete project!'
    })
  }
}

export const handleMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findOne({ email: req.body.email })
    const project = await Project.findById(req.params.id)
    if (project === null || user === null) {
      res.status(400).json({
        status: 'Failure',
        message: 'User with provided email don\'t exists'
      })
      return
    }
    const owner = await User.findById(project.owner)
    if (owner === null) return

    // Add member
    if (!project.members.includes(user._id)) {
      await Project.findByIdAndUpdate(req.params.id, {
        members: [...project.members, user._id]
      }, {
        new: true
      })

      // const _dirname = path.dirname(fileURLToPath(import.meta.url))
      // const html = pug.renderFile(`${_dirname}/../templates/email/invitation.pug`, {
      const html = pug.renderFile(path.join(__dirname, '/../templates/email/invitation.pug'), {
        firstName: user.firstName,
        lastName: user.lastName,
        ownerFirstName: owner.firstName,
        ownerLastName: owner.lastName,
        project: project.name,
        timeStamp: new Date().toDateString()
      })
      await sendEmail({
        from: 'flow-app@outlook.com',
        to: req.body.email,
        html,
        subject: 'Flow - You have been added to a project'
      })
    } else {
      // Remove member
      await Project.findByIdAndUpdate(req.params.id, {
        members: project.members.filter((id) => !user._id.equals(id))
      }, {
        new: true
      })
    }
    const updatedProject = await Project.findById(req.params.id).populate('members')
    res.status(200).json({
      status: 'Success',
      project: updatedProject
    })
  } catch {
    res.status(400).json({
      status: 'Failure',
      message: 'Something went wrong while trying to add or remove member!'
    })
  }
}
