const User = require('../models/User')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}


// LOGIN
const loginUser = async (req, res) => {

  const { email, password } = req.body

  try {
    const user = await User.login(email, password)
    const token = createToken(user._id)

    res.status(200).json({
      name: user.name,
      email: user.email,
      token
    })

  } catch (error) {

    res.status(400).json({ error: error.message })

  }
}


// SIGNUP
const signupUser = async (req, res) => {

  const { name, email, password } = req.body
  
  try {
    const user = await User.signup(name, email, password)

    const token = createToken(user._id)

    res.status(200).json({
      name: user.name,
      email: user.email,
      token
    })

  } catch (error) {

    res.status(400).json({ error: error.message })

  }

}

module.exports = {
  signupUser,
  loginUser
}