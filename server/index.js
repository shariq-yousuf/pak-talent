import express from 'express'
import cookieParser from 'cookie-parser'
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

app.use('/users', userRouter)
app.use(checkUser)
app.use('/jobs', jobRouter)
app.use('/applications', applicationRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
