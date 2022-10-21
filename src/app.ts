import * as dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import config from './config'

dotenv.config()

const app = express()

app.get('/', (_: Request, res: Response) => {
  res.send('Hello World!')
})

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`)
})
