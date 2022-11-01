import nodemailer, { SendMailOptions } from 'nodemailer'
import config from '../config'

export const sendEmail = async (message: SendMailOptions): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: config.emailUserame,
      pass: config.emailPassword
    }
  })

  await transporter.sendMail(message)
}
