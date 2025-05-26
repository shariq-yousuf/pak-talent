import express from 'express'
import multer from 'multer'

import { createApplication, getAllApplications } from '../models/Application.js'

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/resumes')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  },
})
const upload = multer({ storage })

router
  .route('/')
  .get(async (req, res) => {
    try {
      const applications = await getAllApplications()
      res.json({ success: true, data: { applications } })
    } catch (error) {
      console.error('Error fetching applications:', error?.message)
      res
        .status(500)
        .json({ success: false, error: 'Failed to fetch applications' })
    }
  })
  .post(upload.single('resume'), async (req, res) => {
    const applicationData = req.body
    const { candidateId, jobId } = applicationData
    const resumeFile = req.file

    if (!candidateId || !jobId || !resumeFile) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    try {
      const newApplication = await createApplication({
        resume: resumeFile.path,
        ...applicationData,
      })

      if (!newApplication) {
        return res
          .status(500)
          .json({ success: false, error: 'Failed to create application' })
      }

      res
        .status(201)
        .json({ success: true, data: { application: newApplication } })
    } catch (error) {
      console.error('Error creating application:', error?.message)
      res
        .status(500)
        .json({ success: false, error: 'Failed to create application' })
    }
  })

export default router
