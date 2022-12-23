import express from 'express'
import serverless from 'serverless-http'
import mongoose from 'mongoose'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import cors from 'cors'
import config from './config'
import path from 'path'
// import { fileURLToPath } from 'url'
import { boardRouter, listRouter, projectRouter, userRouter, cardRouter } from './routes'

const API_PREFIX = '/.netlify/functions/app'

const API_ROOT = process.env.NODE_ENV === 'production'
  ? API_PREFIX
  : API_PREFIX

// Create Express App
const app = express()

// Global Middleware
app.use(helmet({
  crossOriginResourcePolicy: false
}))
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP!'
}))
app.use(express.json())
app.use(cors())

// const _dirname = path.dirname(fileURLToPath(import.meta.url))
// app.use('/public', express.static(_dirname + '/public'))
app.use('/public', express.static(path.join(__dirname, '/public')))

// Routes
app.use(`${API_ROOT}/users`, userRouter)
app.use(`${API_ROOT}/projects`, projectRouter)
app.use(`${API_ROOT}/boards`, boardRouter)
app.use(`${API_ROOT}/lists`, listRouter)
app.use(`${API_ROOT}/cards`, cardRouter)

// DB Connection
mongoose.connect(config.databaseUrl, error => {
  if (error != null) {
    console.log(error)
  } else {
    console.info('Connection with database established!')
  }
})

export const handler = serverless(app)
