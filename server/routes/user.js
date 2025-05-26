import express from 'express'

import userController from '../controllers/user.js'

const router = express.Router()

router.route('/').post(userController.createUser)
router.route('/:id').delete(userController.deleteUser)

export default router
