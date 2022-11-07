import { Request, Response } from 'express'
import { Board, Project } from '../models'

export const createBoard = async (req: Request, res: Response): Promise<void> => {
  try {
    const board = await Board.create(req.body)
    const project = await Project.findById(req.body.project)
    await Project.findByIdAndUpdate(req.body.project, {
      boardsCount: project?.boardsCount as number + 1
    }, {
      new: true
    })
    res.status(200).json({
      status: 'Success',
      board
    })
  } catch {
    res.status(400).json({
      status: 'Failure',
      message: 'Something went wrong while trying to create board!'
    })
  }
}

export const getBoardsByProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const boards = await Board.find({ project: req.params.id })

    res.status(200).json({
      status: 'Success',
      boards
    })
  } catch {
    res.status(400).json({
      status: 'Failure',
      message: 'Project doesn\'t have any boards!'
    })
  }
}

export const updateBoard = (req: Request, res: Response): void => {
  Board.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })
    .then(response => {
      res.status(201).json({
        status: 'Success',
        board: response
      })
    })
    .catch(() => {
      res.status(400).json({
        status: 'Failure',
        message: 'Something went wrong while trying to update board!'
      })
    })
}

export const deleteBoard = async (req: Request, res: Response): Promise<void> => {
  try {
    const board = await Board.findById(req.params.id)
    await Board.findByIdAndDelete(req.params.id)
    const project = await Project.findById(board?.project)
    if (project !== null && project.boardsCount > 0) {
      await Project.findByIdAndUpdate(board?.project, {
        boardsCount: project.boardsCount - 1
      }, {
        new: true
      })
    }

    res.status(204).json({
      status: 'Success',
      project: null
    })
  } catch {
    res.status(400).json({
      status: 'Failure',
      message: 'Something went wrong while trying to delete board!'
    })
  }
}

export const addOrRemoveMember = async (req: Request, res: Response): Promise<void> => {
  try {
    const board = await Board.findById(req.params.id)
    if (board === null) return

    // Add member
    if (!board.members.includes(req.body.memberId)) {
      await Board.findByIdAndUpdate(req.params.id, {
        members: [...board.members, req.body.memberId]
      }, {
        new: true
      })
    } else {
      // Remove member
      await Board.findByIdAndUpdate(req.params.id, {
        members: board.members.filter((id) => req.body.memberId !== id.toString())
      }, {
        new: true
      })
    }
    const newBoard = await Board.findById(req.params.id)
    res.status(200).json({
      status: 'Success',
      board: newBoard
    })
  } catch {
    res.status(400).json({
      status: 'Failure',
      message: 'Something went wrong while trying to change member permissions!'
    })
  }
}
