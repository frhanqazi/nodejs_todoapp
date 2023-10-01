import { User } from '../models/user.js'
import jwt from 'jsonwebtoken'

export const isAuthenticate = async (req, res, next) => {
  const { token } = req.cookies
  if (!token) {
    res.json({
      success: false,
      message: 'Login First',
    })
  } else {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded._id)
    next()
  }
}
