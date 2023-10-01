import { Task } from '../models/task.js'

export const newTask = async (req, res) => {
  try {
    const { title, description } = req.body
    await Task.create({
      title,
      description,
      user: req.user,
    })
    res.json({
      success: true,
      message: 'Task Created',
    })
  } catch (error) {
    console.log(error)
  }
}

export const getMyTasks = async (req, res) => {
  try {
    const userid = req.user._id
    const tasks = await Task.find({ user: userid })
    if (!tasks) {
      res.status(404).json({
        success: false,
        message: 'No tasks found',
      })
    }
    res.json({
      success: true,
      tasks,
    })
  } catch (error) {
    console.log(error)
  }
}
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params
    const task = await Task.findById(id)
    if (!task) {
      res.status(404).json({
        success: false,
        message: 'Task Not Found',
      })
    } else {
      task.isCompleted = !task.isCompleted
      await task.save()
      res.json({
        success: true,
        message: 'Task updated!',
      })
    }
  } catch (error) {
    console.log(console.error)
  }
}
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params
    const task = await Task.findById(id)

    if (!task)
      return res.status(404).json({
        success: false,
        message: 'Task Not found',
      })
    else {
      task.deleteOne()
      res.json({
        success: true,
        message: 'Task deleted successfully',
      })
    }
  } catch (error) {
    console.log(error)
  }
}
