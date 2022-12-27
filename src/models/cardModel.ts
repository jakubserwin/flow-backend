import { Schema, model } from 'mongoose'
import { ICard } from 'src/types'

const cardSchema = new Schema<ICard>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  assignee: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  dueDate: {
    type: Number
  },
  description: {
    type: String
  }
})

export const Card = model<ICard>('Card', cardSchema)
