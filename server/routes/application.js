import express from 'express'

import applicationController from '../controllers/application.js'
import multerMiddlewares from '../middlewares/multer.js'
import { checkUserRole } from '../middlewares/user.js'

const router = express.Router()

router
  .route('/')
  .get(applicationController.getAllApplications)
  .post(
    multerMiddlewares.upload.single('resume'),
    checkUserRole(['candidate', 'admin']),
    applicationController.createApplication
  )

router.use(checkUserRole(['candidate', 'admin']))
router.route('/:id').delete(applicationController.deleteApplication)

export default router
