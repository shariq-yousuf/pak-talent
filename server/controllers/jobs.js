import express from 'express'

import { createJob, deleteJob, getAllJobs, updateJob } from '../models/jobs.js'

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
  .patch(async (req, res) => {
    const jobData = req.body
    const { _id, title, description, type, tags, salary, deadline } = jobData

    if (
      !_id ||
      !title ||
      !description ||
      !type ||
      !tags ||
      !salary ||
      !deadline
    ) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    try {
      const updatedJob = await updateJob(jobData)

      if (!updatedJob) {
        return res
          .status(500)
          .json({ success: false, error: 'Failed to update job' })
      }

      res.json({ success: true, data: { job: updatedJob } })
    } catch (error) {
      console.error('Error updating job:', error?.message)
      res.status(500).json({ success: false, error: 'Failed to update job' })
    }
  })
  .delete(async (req, res) => {
    const { _id } = req.body

    if (!_id) {
      return res.status(400).json({ error: 'Job ID is required' })
    }

    try {
      const deletedJob = await deleteJob(_id)

      if (!deletedJob) {
        return res
          .status(500)
          .json({ success: false, error: 'Failed to delete job' })
      }

      res.json({ success: true, data: { job: deletedJob } })
    } catch (error) {
      console.error('Error deleting job:', error?.message)
      res.status(500).json({ success: false, error: 'Failed to delete job' })
    }
  })

export default router
