import express from 'express'

const router = express.Router()

router.route('/').get((req, res) => {
  res.json({ message: 'List of jobs' })
})

export default router
