import express from 'express'

import { getAllJobs, createJob } from '../models/jobs.js'

const router = express.Router()

router
  .route('/')
  .get(async (req, res) => {
    try {
      const jobs = await getAllJobs()
      res.json({ success: true, data: { jobs } })
    } catch (error) {
      console.error('Error fetching jobs:', error?.message)
      res.status(500).json({ success: false, error: 'Failed to fetch jobs' })
    }
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
