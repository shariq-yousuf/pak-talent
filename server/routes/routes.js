import express from 'express'

import jobsController from '../controllers/jobs.js'
import usersController from '../controllers/users.js'
import applicationsController from '../controllers/applications.js'

const router = express.Router()

router.use('/jobs', jobsController)
router.use('/users', usersController)
router.use('/applications', applicationsController)

export default router
