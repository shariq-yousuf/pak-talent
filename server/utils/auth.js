import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })
}

export const generateHash = async (password) => {
  const saltRounds = 10
  return bcrypt.hash(password, saltRounds)
}
