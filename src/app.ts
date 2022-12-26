import express from 'express'
import serverless from 'serverless-http'
import mongoose from 'mongoose'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import cors from 'cors'
import config from './config'
import path from 'path'
import { HandlerEvent } from '@netlify/functions'
// import { fileURLToPath } from 'url'
import { boardRouter, listRouter, projectRouter, userRouter, cardRouter } from './routes'

const API_PREFIX = '/.netlify/functions/app'

// Create Express App
const app = express()

// Global Middleware
app.use(helmet({
  crossOriginResourcePolicy: false
}))
app.use(cors())
app.use(express.json())
app.use(rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100,
  message: 'Too many requests from this IP!'
}))

// const _dirname = path.dirname(fileURLToPath(import.meta.url))
// app.use('/public', express.static(_dirname + '/public'))
app.use('/public', express.static(path.join(__dirname, '/public')))

// Routes
app.use(`${API_PREFIX}/users`, userRouter)
app.use(`${API_PREFIX}/projects`, projectRouter)
app.use(`${API_PREFIX}/boards`, boardRouter)
app.use(`${API_PREFIX}/lists`, listRouter)
app.use(`${API_PREFIX}/cards`, cardRouter)

// DB Connection
mongoose.connect(config.databaseUrl, error => {
  if (error != null) {
    console.log(error)
  } else {
    console.info('Connection with database established!')
  }
})

const handler = serverless(app)
module.exports.handler = async (event: HandlerEvent, context: any) => {
  const result = await handler(event, context)

  return result
}
