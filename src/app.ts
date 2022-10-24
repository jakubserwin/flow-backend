import express from 'express'
import mongoose from 'mongoose'
import config from './config'
import { userRouter } from './routes'

// Create Express App
const app = express()

// Global Middleware
app.use(express.json())

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
