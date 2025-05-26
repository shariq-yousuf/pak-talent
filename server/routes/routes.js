import express from 'express'

import jobsController from '../controllers/jobs.js'

const router = express.Router()

router.use('/jobs', jobsController)

export default router
