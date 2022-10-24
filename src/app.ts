import express from 'express'
import mongoose from 'mongoose'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import cors from 'cors'
import config from './config'
import { userRouter } from './routes'

// Create Express App
const app = express()

// Global Middleware
app.use(helmet())
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP!'
}))
app.use(express.json())
app.use(cors())

// Routes
app.use('/users', userRouter)

// DB Connection
mongoose.connect(config.databaseUrl, error => {
  if (error != null) {
    console.log(error)
  } else {
    console.info('Connection with database established!')
  }
})

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}!`)
})
