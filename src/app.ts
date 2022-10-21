// import express, { Request, Response } from "express"
const express = require('express')

const app = express()
const port = 5000

app.get('/', (_: Request, res: Response) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})