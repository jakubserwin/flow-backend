import express from 'express'
import mongoose from 'mongoose'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import cors from 'cors'
import config from './config'
import path from 'path'
import { fileURLToPath } from 'url'
import { boardRouter, projectRouter, userRouter } from './routes'

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

// app.use((req, res, next) => {
//   res.header('Cross-Origin-Resource-Policy', 'cross-origin')
//   next()
// })

const _dirname = path.dirname(fileURLToPath(import.meta.url))
app.use('/public', express.static(_dirname + '/public'))

// Routes
app.use('/users', userRouter)
app.use('/projects', projectRouter)
app.use('/boards', boardRouter)

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
