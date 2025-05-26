import User from '../models/User.js'
import { camparePassword, generateHash, generateToken } from '../utils/auth.js'

const createUser = async (req, res) => {
  const { username, email, password, companyName, role } = req.body

  if (!username || !email || !password || !companyName || !role) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    const passwordHash = await generateHash(password)

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

    res.header('Authorization', `Bearer ${generateToken(newUser._id)}`)
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

  if (id !== req.user._id.toString()) {
    return res
      .status(401)
      .json({ error: 'Unauthorized. You can only delete your own account' })
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

const loginUser = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  try {
    const user = await User.findByEmail(email)

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' })
    }

    const isPasswordValid = await camparePassword(password, user.passwordHash)

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    res.header('Authorization', `Bearer ${generateToken(user._id)}`)
    res.json({ success: true, data: { user } })
  } catch (error) {
    console.error('Error logging in user:', error?.message)
    res.status(500).json({ success: false, error: 'Failed to log in user' })
  }
}

const signoutUser = (req, res) => {
  try {
    res.header('Authorization', '')
    res.json({ success: true, message: 'User signed out successfully' })
  } catch (error) {
    console.error('Error signing out user:', error?.message)
    res.status(500).json({ success: false, error: 'Failed to sign out user' })
  }
}

export default {
  createUser,
  deleteUser,
  loginUser,
  signoutUser,
}
