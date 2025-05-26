import express from 'express'
import { config } from 'dotenv'
config()

import router from './routes/routes.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.get('/hello', (req, res) => {
  res.send('Hello, World!')
})

app.use('/', router)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
