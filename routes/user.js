import express from 'express'
import {
  getMyProfile,
  getallUsers,
  login,
  logout,
  register,
} from '../controllers/user.js'
import { isAuthenticate } from '../middleware/auth.js'
const router = express.Router()

router.get('/all', getallUsers)

router.post('/login', login)
router.get('/logout', logout)

router.post('/new', register)

router.get('/me', isAuthenticate, getMyProfile)

export default router
