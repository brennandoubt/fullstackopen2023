/**
 * Define separate router for users of blog list app
 * 
 */
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// create new user
usersRouter.post('/', async (request, response) => {
  // check username/password exist
  if (!(request.body.username && request.body.password)) {
    return response.status(401).json({
      error: 'username and password are required'
    })
  }

  const { username, name, password } = request.body

  // check username/password length
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

// get all users
usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { likes: 0, user: 0 })

  response.json(users)
})

module.exports = usersRouter