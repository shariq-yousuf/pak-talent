import express from 'express'

import jobController from '../controllers/job.js'
import { checkUserRole } from '../middlewares/user.js'

const router = express.Router()

router.get('/', jobController.getAllJobs)

router.use(checkUserRole(['employer', 'admin']))
router.post('/', jobController.createJob)
router
  .route('/:id')
  .patch(jobController.updateJob)
  .delete(jobController.deleteJob)

export default router
