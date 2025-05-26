import express from 'express'
import bcrypt from 'bcrypt'

import { createUser, deleteUser } from '../models/User.js'

const router = express.Router()
const saltRounds = 10

router
  .route('/')
  .post(async (req, res) => {
    const { username, email, password, companyName, role } = req.body

    if (!username || !email || !password || !companyName || !role) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    try {
      const passwordHash = await bcrypt.hash(password, saltRounds)

      const newUser = await createUser({
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
  })
  .delete(async (req, res) => {
    const { _id } = req.body

    if (!_id) {
      return res.status(400).json({ error: 'User ID is required' })
    }

    try {
      const deletedUser = await deleteUser(_id)

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
  })

export default router
