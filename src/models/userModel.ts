import { Schema, model, Model } from 'mongoose'
import bcrypt from 'bcryptjs'

interface IUser {
  firstName: string
  lastName: string
  email: string
  password: string
  avatar?: string
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: String
})

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

userSchema.methods.verifyPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password)
}

interface IUserDocument extends IUser, Document {
  verifyPassword: (password: string) => Promise<boolean>
}

interface IUserModel extends Model<IUserDocument> {
  findByUsername: (username: string) => Promise<IUserDocument>
}

export const User = model<IUserDocument, IUserModel>('User', userSchema)
