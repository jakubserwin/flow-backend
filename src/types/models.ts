import { Types } from 'mongoose'

export interface IUser {
  _id: Types.ObjectId
  firstName: string
  lastName: string
  email: string
  password: string
  avatar?: string
}

export interface IProject {
  _id: Types.ObjectId
  name: string
  color: string
  isFavourite: boolean
  owner: Types.ObjectId
  members: Types.ObjectId[]
  boardsCount: number
}

export interface IBoard {
  _id: Types.ObjectId
  name: string
  color: string
  project: Types.ObjectId
  members: Types.ObjectId[]
}