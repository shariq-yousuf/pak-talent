import express from 'express'
import { config } from 'dotenv'
config()

import userRouter from './routes/user.js'
import jobRouter from './routes/job.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use('/users', userRouter)
app.use('/jobs', jobRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
