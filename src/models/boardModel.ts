import { Schema, model } from 'mongoose'
import { IBoard } from 'src/types'

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

export const Board = model<IBoard>('Board', boardSchema)
