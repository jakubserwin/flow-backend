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
  onwer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
    required: true
  }
})

export const Project = model<IProject>('User', projectSchema)
