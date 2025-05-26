import mongoose from 'mongoose'
import { connectToDB } from '../db/db.js'
const { Schema } = mongoose

const jobSchema = new Schema({
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: String,
  type: { type: String, required: true },
  tags: [String],
  salary: { type: Number, required: true },
  deadline: { type: Date, required: true },
})

const Job = mongoose.model('Job', jobSchema)

const getAllJobs = async (employer) => {
  try {
    await connectToDB()
    const jobs = await Job.find({}).populate('employer')

    if (employer) {
      return jobs.filter((job) => job.employer._id.toString() === employer)
    }

    return jobs
  } catch (error) {
    console.error('Error fetching jobs:', error?.message)
    return []
  }
}

const createJob = async (jobData) => {
  try {
    await connectToDB()

    const job = new Job(jobData)
    return await job.save()
  } catch (error) {
    console.error('Error creating job:', error?.message)
    return null
  }
}

const updateJob = async ({ id, ...updateData }) => {
  try {
    await connectToDB()

    return await Job.findByIdAndUpdate(id, updateData, {
      new: true,
    })
  } catch (error) {
    console.error('Error updating job:', error?.message)
    return null
  }
}

const deleteJob = async (job) => {
  try {
    await connectToDB()
    return await Job.findByIdAndDelete(job)
  } catch (error) {
    console.error('Error deleting job:', error?.message)
    return null
  }
}

export default {
  getAllJobs,
  createJob,
  updateJob,
  deleteJob,
}
