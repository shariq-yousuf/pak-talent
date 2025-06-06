import mongoose from 'mongoose'
import { connectToDB } from '../db/db.js'
const { Schema } = mongoose

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ['candidate', 'employer', 'admin'],
    default: 'candidate',
  },
})

const User = mongoose.model('User', userSchema)

const createUser = async (userData) => {
  try {
    await connectToDB()

    const user = new User(userData)
    return await user.save()
  } catch (error) {
    console.error('Error creating user:', error?.message)
    return null
  }
}

const deleteUser = async (userId) => {
  try {
    await connectToDB()
    return await User.findByIdAndDelete(userId)
  } catch (error) {
    console.error('Error deleting user:', error?.message)
    return null
  }
}

const getAllUsers = async () => {
  try {
    await connectToDB()
    return await User.find({})
  } catch (error) {
    console.error('Error fetching users:', error?.message)
    return []
  }
}

const findByEmail = async (email) => {
  try {
    await connectToDB()
    return await User.findOne({ email })
  } catch (error) {
    console.error('User not found:', error?.message)
    return null
  }
}

const findById = async (_id) => {
  try {
    await connectToDB()
    return await User.findOne({ _id })
  } catch (error) {
    console.error('User not found:', error?.message)
    return null
  }
}

export default {
  createUser,
  deleteUser,
  getAllUsers,
  findByEmail,
  findById,
}
