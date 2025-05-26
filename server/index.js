import express from 'express'
import { config } from 'dotenv'
config()

import userRouter from './routes/user.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.get('/hello', (req, res) => {
  res.send('Hello, World!')
})

app.use('/users', userRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
