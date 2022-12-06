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
  order: {
    type: Number
  }
})

export const Card = model<ICard>('Card', cardSchema)
