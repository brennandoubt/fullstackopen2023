/**
 * Controller for user login functionality.
 * 
 * Uses 'jsonwebtoken' library to generate JSON web tokens
 * to implement functionality for users to log in with token-based
 * authentication.
 */
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  // search for user from database by 'username' attached to request
  const user = await User.findOne({ username })
  // verify 'password' also attached to request using bcrypt.compare method
  const passwordCorrect = (user === null)
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  // create token with signed form of username and user id using hidden string in 'SECRET'
  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    // token expires in 60*60 seconds, or one hour
    { expiresIn: 60*60 }
  )

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter