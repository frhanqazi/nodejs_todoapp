import { User } from '../models/user.js'
import bcrypt from 'bcrypt'
import { sendToken } from '../utils/features.js'

export const getallUsers = async (req, res) => {
  try {
    const users = await User.find({})
    res.json({
      succes: true,
      users,
    })
  } catch (error) {
    console.log(error)
  }
}

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
      return res.status(404).json({
        success: false,
        message: 'User Already Exist',
      })
    } else {
      const passwordHashed = await bcrypt.hash(password, 10)
      let user = await User.create({
        name,
        email,
        password: passwordHashed,
      })

      sendToken(user, res, 'Registered Succesfull', 201)
    }
  } catch (error) {
    console.log(error)
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      res.json({
        success: false,
        message: 'No such user',
      })
    } else {
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        res.json({
          success: false,
          message: 'Wrong Password Entered',
        })
      } else {
        sendToken(user, res, `Logged In successfully ${user.name}`, 200)
      }
    }
  } catch (error) {
    console.log(error)
  }
}

export const logout = (req, res) => {
  try {
    res
      .cookie('token', null, {
        httpOnly: true,
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "You've been logged out",
        sameSite: process.env.NODE_ENV === 'Development' ? 'lax' : 'none',
        secure: process.env.NODE_ENV === 'Development' ? false : true,
      })
  } catch (error) {
    console.log(error)
  }
}

export const getMyProfile = async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user,
    })
  } catch (error) {
    console.log(error)
  }
}
