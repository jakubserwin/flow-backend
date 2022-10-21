import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import config from './config'

// Create Express App
const app = express()

// Global Middleware

app.get('/', (_: Request, res: Response) => {
  res.send('Hello World!')
})

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
