import mongoose from 'mongoose'
import { connectToDB } from '../db/db.js'
const { Schema } = mongoose

const jobSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  type: { type: String, required: true },
  tags: [String],
  salary: { type: Number, required: true },
  deadline: { type: Date, required: true },
})

const Job = mongoose.model('Job', jobSchema)

export const getAllJobs = async () => {
  try {
    await connectToDB()
    return await Job.find({})
  } catch (error) {
    console.error('Error fetching jobs:', error?.message)
    return []
  }
}

export const createJob = async (jobData) => {
  try {
    await connectToDB()

    const job = new Job(jobData)
    return await job.save()
  } catch (error) {
    console.error('Error creating job:', error?.message)
    return null
  }
}

export const updateJob = async (jobData) => {
  try {
    await connectToDB()

    const { _id, ...updateData } = jobData
    return await Job.findByIdAndUpdate(_id, updateData, {
      new: true,
    })
  } catch (error) {
    console.error('Error updating job:', error?.message)
    return null
  }
}

export const deleteJob = async (jobId) => {
  try {
    await connectToDB()
    return await Job.findByIdAndDelete(jobId)
  } catch (error) {
    console.error('Error deleting job:', error?.message)
    return null
  }
}

export default Job
