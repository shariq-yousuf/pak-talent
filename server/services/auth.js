import User from '../models/User.js'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/auth.js'

export const checkUser = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) return null

  const isMatch = await bcrypt.compare(password, user.passwordHash)
  return isMatch ? user : null
}
