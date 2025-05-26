import express from 'express'

import userController from '../controllers/user.js'

const router = express.Router()

router.route('/').post(userController.createUser)
router.route('/:id').delete(userController.deleteUser)
router.route('/login').post(userController.loginUser)

export default router
