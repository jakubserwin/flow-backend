import { Schema, model } from 'mongoose'
import { IBoard } from 'src/types'
import { List } from './listModel'
import { Project } from './projectModel'

const boardSchema = new Schema<IBoard>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  color: {
    type: String,
    required: true,
    trim: true
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  members: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
    required: true
  }
})

boardSchema.pre('save', async function (next) {
  // TODO improvement needed -> decrease double find
  const project = await Project.findById(this.project)
  await Project.findByIdAndUpdate(this.project, {
    boardsCount: project?.boardsCount as number + 1
  }, {
    new: true
  })
  next()
})

boardSchema.pre('findOneAndDelete', async function (next) {
  const { _id } = this.getQuery()
  const board = await Board.findById(_id)
  await List.deleteMany({ board: _id })
  const projectScheme = await Project.findById(board?.project)
  if (projectScheme !== null && projectScheme.boardsCount > 0) {
    await Project.findByIdAndUpdate(board?.project, {
      boardsCount: projectScheme.boardsCount - 1
    }, {
      new: true
    })
  }
  next()
})

boardSchema.pre('deleteMany', async function (next) {
  const { project } = this.getQuery()
  const boards = await Board.find({ project })

  boards.forEach(async (board) => {
    await List.deleteMany({ board: board._id })
  })

  next()
})

export const Board = model<IBoard>('Board', boardSchema)
