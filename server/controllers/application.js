import Application from '../models/Application.js'

const getAllApplications = async (req, res) => {
  const { candidate } = req.query

  try {
    const applications = await Application.getAllApplications(candidate)
    res.json({ success: true, data: { applications } })
  } catch (error) {
    console.error('Error fetching applications:', error?.message)
    res
      .status(500)
      .json({ success: false, error: 'Failed to fetch applications' })
  }
}

const createApplication = async (req, res) => {
  const applicationData = req.body
  const { candidate, job } = applicationData
  const resumeFile = req.file

  if (!candidate || !job || !resumeFile) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    const newApplication = await Application.createApplication({
      resume: resumeFile.path,
      ...applicationData,
    })

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
}

export default {
  getAllApplications,
  createApplication,
}
