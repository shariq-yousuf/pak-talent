import jwt from 'jsonwebtoken'

export const checkUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (!decoded || !decoded.id) {
      return res.status(401).json({ success: false, error: 'Unauthorized' })
    }

    next()
  } catch (error) {
    console.error('Authorization error:', error?.message)
    return res.status(401).json({ success: false, error: 'Unauthorized' })
  }
}
