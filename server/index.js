import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { config } from 'dotenv'
config()

import userRouter from './routes/user.js'
import jobRouter from './routes/job.js'
import applicationRouter from './routes/application.js'

import { checkUser } from './middlewares/user.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
)

app.use('/users', userRouter)
app.use('/api/users', userRouter)

app.use(checkUser)
app.use('/jobs', jobRouter)
app.use('/api/jobs', jobRouter)

app.use('/applications', applicationRouter)
app.use('/api/applications', applicationRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
