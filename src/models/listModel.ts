import { Schema, model } from 'mongoose'
import { IList } from 'src/types'
import { Card } from './cardModel'

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

listSchema.pre('findOneAndDelete', async function (next) {
  const { _id } = this.getQuery()
  const list = await List.findById(_id)
  if (list === null) return
  list.cards.forEach(async (card) => {
    await Card.findByIdAndDelete(card)
  })
  next()
})

listSchema.pre('deleteMany', async function (next) {
  const { board } = this.getQuery()
  const lists = await List.find({ board })
  lists.forEach((list) => {
    list.cards.forEach(async (card) => {
      await Card.findByIdAndDelete(card)
    })
  })
  next()
})

export const List = model<IList>('List', listSchema)
