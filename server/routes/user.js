import express from 'express'

import userController from '../controllers/user.js'
import { checkUser } from '../middlewares/user.js'

const router = express.Router()

router.route('/').post(userController.createUser)
router.route('/:id').delete(checkUser, userController.deleteUser)
router.route('/login').post(userController.loginUser)
router.route('/signout').post(checkUser, userController.signoutUser)

export default router
