import Job from '../models/Job.js'

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.getAllJobs(req.user)
    res.json({ success: true, data: { jobs } })
  } catch (error) {
    console.error('Error fetching jobs:', error?.message)
    res.status(500).json({ success: false, error: 'Failed to fetch jobs' })
  }
}

const createJob = async (req, res) => {
  const userId = req.user?._id
  const jobData = req.body
  const { title, description, type, tags, salary, deadline } = jobData

  if (!title || !description || !type || !tags || !salary || !deadline) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  const newJob = await Job.createJob({ employer: userId, ...jobData })

  if (!newJob) {
    return res
      .status(500)
      .json({ success: false, error: 'Failed to create job' })
  }

  res.status(201).json({ success: true, data: { job: newJob } })
}

const updateJob = async (req, res) => {
  const { id } = req.params
  const jobData = req.body
  const { title, description, type, tags, salary, deadline } = jobData

  if (!id || !title || !description || !type || !tags || !salary || !deadline) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    const updatedJob = await Job.updateJob({ id, ...jobData })

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
}

const deleteJob = async (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ error: 'Job ID is required' })
  }

  try {
    const deletedJob = await Job.deleteJob(id)

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
}

export default {
  getAllJobs,
  createJob,
  updateJob,
  deleteJob,
}
