import mongoose from 'mongoose'
import { connectToDB } from '../db/db.js'
const { Schema } = mongoose

const applicationSchema = new Schema(
  {
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    resume: { type: String, required: true },
    coverLetter: { type: String },
    status: {
      type: String,
      enum: ['applied', 'interviewing', 'offered', 'rejected'],
      default: 'applied',
    },
  },
  {
    timestamps: true,
  }
)

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

const getAllApplications = async (user) => {
  try {
    await connectToDB()
    const applications = await Application.find({}).populate('job')

    if (user.role === 'candidate') {
      const candidate = user._id.toString()
      return applications.filter(
        (app) => app.candidate.toString() === candidate
      )
    }

    if (user.role === 'employer') {
      const employer = user._id.toString()
      return applications.filter(
        (app) => app.job.employer.toString() === employer
      )
    }

    return applications
  } catch (error) {
    console.error('Error fetching applications:', error?.message)
    return []
  }
}

const getApplicationsByCandidate = async (candidate) => {
  try {
    await connectToDB()
    return await Application.find({ candidate })
  } catch (error) {
    console.error(
      'Error fetching applications by candidate ID:',
      error?.message
    )
    return []
  }
}

const getApplicationsByJob = async (job) => {
  try {
    await connectToDB()
    return await Application.find({ job })
  } catch (error) {
    console.error('Error fetching applications by job ID:', error?.message)
    return []
  }
}

export default {
  createApplication,
  deleteApplication,
  getAllApplications,
  getApplicationsByCandidate,
  getApplicationsByJob,
}
