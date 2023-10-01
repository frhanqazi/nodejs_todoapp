import express from 'express'
import {
  deleteTask,
  getMyTasks,
  newTask,
  updateTask,
} from '../controllers/task.js'
import { isAuthenticate } from '../middleware/auth.js'

const router = express.Router()

router.post('/new', isAuthenticate, newTask)
router.get('/my', isAuthenticate, getMyTasks)

router.route('/:id', isAuthenticate).put(updateTask).delete(deleteTask)

export default router
