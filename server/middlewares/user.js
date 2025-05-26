import jwt from 'jsonwebtoken'

import User from '../models/User.js'

export const checkUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (!decoded || !decoded.id) {
      return res.status(401).json({ success: false, error: 'Unauthorized' })
    }

    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(401).json({ success: false, error: 'Unauthorized' })
    }

    req.user = user
    next()
  } catch (error) {
    console.error('Authorization error:', error?.message)
    return res.status(401).json({ success: false, error: 'Unauthorized' })
  }
}

export const checkUserRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, error: 'Forbidden' })
    }

    next()
  }
}
