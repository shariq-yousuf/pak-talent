import path from 'path'
import { fileURLToPath } from 'url'
import User from '../models/User.js'
import { camparePassword, generateHash, generateToken } from '../utils/auth.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const createUser = async (req, res) => {
  const { username, email, password, role } = req.body

  if (!username || !email || !password || !role) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    const passwordHash = await generateHash(password)

    const newUser = await User.createUser({
      username,
      email,
      passwordHash,
      role,
    })

    if (!newUser) {
      return res
        .status(500)
        .json({ success: false, error: 'Failed to create user' })
    }

    // res.header('Authorization', `Bearer ${generateToken(newUser._id)}`)
    res.cookie('token', generateToken(newUser._id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // or 'strict'
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    })
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

  if (id !== req.user._id.toString() && req.user.role !== 'admin') {
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

    // res.header('Authorization', `Bearer ${generateToken(user._id)}`)
    res.cookie('token', generateToken(user._id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // or 'strict'
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    })
    res.json({ success: true, data: { user } })
  } catch (error) {
    console.error('Error logging in user:', error?.message)
    res.status(500).json({ success: false, error: 'Failed to log in user' })
  }
}

const signoutUser = (req, res) => {
  try {
    // res.header('Authorization', '')
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })
    res.json({ success: true, message: 'User signed out successfully' })
  } catch (error) {
    console.error('Error signing out user:', error?.message)
    res.status(500).json({ success: false, error: 'Failed to sign out user' })
  }
}

const getUser = async (req, res) => {
  const { _id, username, email, role } = req.user
  res
    .status(200)
    .json({ success: true, data: { user: { _id, username, email, role } } })
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers()
    res.status(200).json({ success: true, data: { users } })
  } catch (error) {
    console.error('Error fetching users:', error?.message)
    res.status(500).json({ success: false, error: 'Failed to fetch users' })
  }
}

const getResume = async (req, res) => {
  const resumePath = path.resolve(__dirname, '..', req.query.path)

  res.sendFile(resumePath, (err) => {
    if (err) {
      console.error('Error sending resume:', err)
      res.status(500).json({ success: false, error: 'Failed to send resume' })
    }
  })
}

export default {
  createUser,
  deleteUser,
  loginUser,
  signoutUser,
  getUser,
  getAllUsers,
  getResume,
}
