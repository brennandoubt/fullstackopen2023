/**
 * Define separate router for users of blog list app
 * 
 */
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  if (!(request.body.username && request.body.password)) {
    return response.status(401).json({
      error: 'username and password are required'
    })
  }

  const { username, name, password } = request.body

  if (username.length < 3 || password.length < 3) {
    return response.status(401).json({
      error: 'username and password must be at least 3 characters long'
    })
  }

  // check if username is already taken
  const currentUsers = await User.find({})
  const currentUsernames = currentUsers.map(user => user.username)
  if (currentUsernames.includes(username)) {
    return response.status(400).json({
      error: 'username is already taken'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    passwordHash,
    name
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})

  response.json(users)
})

module.exports = usersRouter