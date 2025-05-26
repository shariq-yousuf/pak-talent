import express from 'express'
import { createApplication, getAllApplications } from '../models/Application.js'

const router = express.Router()

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
  .post(async (req, res) => {
    const applicationData = req.body
    const { candidateId, jobId, resume } = applicationData

    if (!candidateId || !jobId || !resume) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    try {
      const newApplication = await createApplication(applicationData)

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
