import Application from '../models/Application.js'

const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.getAllApplications(req.user)
    res.json({ success: true, data: { applications } })
  } catch (error) {
    console.error('Error fetching applications:', error?.message)
    res
      .status(500)
      .json({ success: false, error: 'Failed to fetch applications' })
  }
}

const createApplication = async (req, res) => {
  const userId = req.user?._id
  const applicationData = req.body
  const resumeFile = req.file

  if (!applicationData.job || !resumeFile) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    const newApplication = await Application.createApplication({
      resume: resumeFile.path,
      candidate: userId,
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

const deleteApplication = async (req, res) => {
  const applicationId = req.params.id

  try {
    const deletedApplication = await Application.deleteApplication(
      applicationId
    )

    if (!deletedApplication) {
      return res
        .status(404)
        .json({ success: false, error: 'Application not found' })
    }

    res.json({ success: true, data: { application: deletedApplication } })
  } catch (error) {
    console.error('Error deleting application:', error?.message)
    res
      .status(500)
      .json({ success: false, error: 'Failed to delete application' })
  }
}

export default {
  getAllApplications,
  createApplication,
  deleteApplication,
}
