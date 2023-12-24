/**
 * File to define separate router for handling users
 * 
 * Relational databases use 'join queries' but for
 * document databases like MongoDB they aren't properly supported,
 * Mongoose can join by doing multiple queries but the state of
 * collections aren't guaranteed to stay consistent or unchanged
 * during Mongoose join queries, unlike with the join queries
 * in relational databases.
 * 
 * Mongoose join queries are done with the 'populate' method.
 */
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  // series of rounds/iterations module goes through to give a secure hash
  const saltRounds = 10

  // store generated hash of password in database
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

// fetch all users in database
usersRouter.get('/', async (request, response) => {
  // use populate to make join query to replace note object IDs in users' notes field with corresponding note documents
  const users = await User
    .find({}).populate('notes', { content: 1, important: 1 })
    
  response.json(users)
})

module.exports = usersRouter