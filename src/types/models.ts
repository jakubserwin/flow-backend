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
  onwer: Types.ObjectId
  members: Types.ObjectId[]
  boards?: string[]
}
