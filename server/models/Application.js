import mongoose from 'mongoose'
import { connectToDB } from '../db/db.js'
const { Schema } = mongoose

const applicationSchema = new Schema({
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  resume: { type: String, required: true },
  coverLetter: { type: String },
  status: {
    type: String,
    enum: ['applied', 'interviewing', 'offered', 'rejected'],
    default: 'applied',
  },
})

const Application = mongoose.model('Application', applicationSchema)

const createApplication = async (applicationData) => {
  try {
    await connectToDB()

    const application = new Application(applicationData)
    return await application.save()
  } catch (error) {
    console.error('Error creating application:', error?.message)
    return null
  }
}

const deleteApplication = async (applicationId) => {
  try {
    await connectToDB()
    return await Application.findByIdAndDelete(applicationId)
  } catch (error) {
    console.error('Error deleting application:', error?.message)
    return null
  }
}

const getAllApplications = async () => {
  try {
    await connectToDB()
    return await Application.find({})
  } catch (error) {
    console.error('Error fetching applications:', error?.message)
    return []
  }
}

const getApplicationsByCandidateId = async (candidateId) => {
  try {
    await connectToDB()
    return await Application.find({ candidateId })
  } catch (error) {
    console.error(
      'Error fetching applications by candidate ID:',
      error?.message
    )
    return []
  }
}

const getApplicationsByJobId = async (jobId) => {
  try {
    await connectToDB()
    return await Application.find({ jobId })
  } catch (error) {
    console.error('Error fetching applications by job ID:', error?.message)
    return []
  }
}

export default {
  createApplication,
  deleteApplication,
  getAllApplications,
  getApplicationsByCandidateId,
  getApplicationsByJobId,
}
