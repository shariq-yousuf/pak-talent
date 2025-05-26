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

export default Job
