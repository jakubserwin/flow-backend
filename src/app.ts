import express from 'express'
import serverless from 'serverless-http'
import mongoose from 'mongoose'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import cors from 'cors'
import config from './config'
import { HandlerEvent } from '@netlify/functions'
import { boardRouter, listRouter, projectRouter, userRouter, cardRouter } from './routes'

const API_PREFIX = '/.netlify/functions/app'

// Create Express App
const app = express()

// Global Middleware
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 1000,
  message: 'Too many requests from this IP!'
}))

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
  return handler(event, context)
}
