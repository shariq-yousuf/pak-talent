import bcrypt from 'bcrypt'

import User from '../models/User.js'

const saltRounds = 10

const createUser = async (req, res) => {
  const { username, email, password, companyName, role } = req.body

  if (!username || !email || !password || !companyName || !role) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = await User.createUser({
      username,
      email,
      passwordHash,
      companyName,
      role,
    })

    if (!newUser) {
      return res
        .status(500)
        .json({ success: false, error: 'Failed to create user' })
    }

    res.status(201).json({ success: true, data: { user: newUser } })
  } catch (error) {
    console.error('Error creating user:', error?.message)
    res.status(500).json({ success: false, error: 'Failed to create user' })
  }
}

const deleteUser = async (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ error: 'User ID is required' })
  }

  try {
    const deletedUser = await User.deleteUser(id)

    if (!deletedUser) {
      return res
        .status(500)
        .json({ success: false, error: 'Failed to delete user.' })
    }

    res.json({ success: true, data: { user: deletedUser } })
  } catch (error) {
    console.error('Error deleting user:', error?.message)
    res.status(500).json({ success: false, error: 'Failed to delete user.' })
  }
}

export default {
  createUser,
  deleteUser,
}
