import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'
import { IUser, IUserDocument } from 'src/types'

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: String
})

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

userSchema.methods.verifyPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password)
}

export const User = model<IUserDocument>('User', userSchema)
