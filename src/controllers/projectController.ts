import { Request, Response } from 'express'
import { sendEmail } from '../utils'
import { Project, Board, User } from '../models'
import { ManageAction } from '../types'

export const createProject = (req: Request, res: Response): void => {
  Project.create(req.body)
    .then(response => {
      res.status(201).json({
        status: 'Success',
        project: response
      })
    })
    .catch((error) => {
      res.status(400).json({
        status: 'Failure',
        message: 'Something went wrong while trying to create project!',
        error
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
  } catch (error) {
    res.status(400).json({
      status: 'Failure',
      message: 'Something went wrong while trying get projects!',
      error
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
    .catch((error) => {
      res.status(400).json({
        status: 'Failure',
        message: 'Something went wrong while trying to update project!',
        error
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
  } catch (error) {
    res.status(400).json({
      status: 'Failure',
      message: 'Something went wrong while trying to delete project!',
      error
    })
  }
}

export const handleMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, action } = req.body
    const user = await User.findOne({ email })
    const project = await Project.findById(req.params.id)
    if (project === null || user === null) {
      res.status(400).json({
        status: 'Failure',
        message: 'User with provided email does not exists!',
        error: null
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

      // const html = pug.renderFile(__dirname + '../templates/email/invitation.pug', {
      //   firstName: user.firstName,
      //   lastName: user.lastName,
      //   ownerFirstName: owner.firstName,
      //   ownerLastName: owner.lastName,
      //   project: project.name,
      //   timeStamp: new Date().toDateString()
      // })
      await sendEmail({
        from: 'flow-app@outlook.com',
        to: req.body.email,
        // html,
        text: `Hello ${user.firstName} ${user.lastName}, ${owner.firstName} ${owner.lastName} has added you to ${project.name} project!`,
        subject: 'Flow - You have been added to a project'
      })
    } else {
      // Remove member
      if (action === ManageAction.INVITE) {
        res.status(400).json({
          status: 'Failure',
          message: 'User has been already added to project!',
          error: null
        })
        return
      }
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
  } catch (error) {
    res.status(400).json({
      status: 'Failure',
      message: 'Something went wrong while trying to add or remove member!',
      error
    })
  }
}
