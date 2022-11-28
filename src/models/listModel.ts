import { Schema, model } from 'mongoose'
import { IList } from 'src/types'

const listSchema = new Schema<IList>({
  stage: {
    type: String,
    required: true,
    trim: true
  },
  cards: {
    type: [Schema.Types.ObjectId],
    ref: 'Card'
  },
  board: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
    required: true
  },
  order: {
    type: Number
  }
})

export const List = model<IList>('List', listSchema)
