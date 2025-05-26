import express from 'express'

import jobController from '../controllers/job.js'

const router = express.Router()

router.route('/').get(jobController.getAllJobs).post(jobController.createJob)
router
  .route('/:id')
  .patch(jobController.updateJob)
  .delete(jobController.deleteJob)

export default router
