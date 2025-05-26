import express from 'express'

import jobsController from '../controllers/jobs.js'
import usersController from '../controllers/users.js'

const router = express.Router()

router.use('/jobs', jobsController)
router.use('/users', usersController)

export default router
