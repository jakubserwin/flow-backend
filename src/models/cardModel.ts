import { Schema, model } from 'mongoose'
import { ICard } from 'src/types'

const cardSchema = new Schema<ICard>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  list: {
    type: Schema.Types.ObjectId,
    ref: 'List'
  },
  assignee: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

export const Card = model<ICard>('Card', cardSchema)
