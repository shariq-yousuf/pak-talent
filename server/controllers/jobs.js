import express from 'express'

import { createJob } from '../models/jobs.js'

const router = express.Router()

router
  .route('/')
  .get((req, res) => {
    res.json({ message: 'List of jobs' })
  })
  .post(async (req, res) => {
    const jobData = req.body
    const { title, description, type, tags, salary, deadline } = jobData

    if (!title || !description || !type || !tags || !salary || !deadline) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    const newJob = await createJob(jobData)

    if (!newJob) {
      return res
        .status(500)
        .json({ success: false, error: 'Failed to create job' })
    }

    res.status(201).json({ success: true, data: { job: newJob } })
  })

export default router
