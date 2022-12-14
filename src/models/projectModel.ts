import { Schema, model } from 'mongoose'
import { IProject } from 'src/types'

const projectSchema = new Schema<IProject>({
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
  isFavourite: {
    type: Boolean,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
    required: true
  },
  boardsCount: {
    type: Number,
    required: true
  }
})

export const Project = model<IProject>('Project', projectSchema)
