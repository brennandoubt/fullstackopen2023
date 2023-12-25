/**
 * notes.js module to handle controllers/event
 * handlers of routes related to notes
 *
 * Uses Express' built-in app router to
 * create a new router object (isolated instance of
 * middleware/routes) used to define routes.
 * 
 * Uses Authorization header to only create new notes if
 * the post request has a valid token attached.
 */

// create new router object that all routes will be defined for
const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

// route to get all notes
notesRouter.get('/', async (request, response) => {
  // use populate to make join query for user info
  const notes = await Note
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(notes)
})

// route to get specific note
notesRouter.get('/:id', async (request, response, next) => {
  const note = await Note.findById(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

// route to create new note
notesRouter.post('/', async (request, response, next) => {
  const body = request.body

  // check validity of token from authorization header and decode it
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  // decoded token contains username and id fields to tell server who made the request
  const user = await User.findById(decodedToken.id)

  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    user: user.id
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  response.status(201).json(savedNote)
})

// route to delete specific note
notesRouter.delete('/:id', async (request, response, next) => {
  await Note.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

// route to update specific note
notesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

// export router object so it's available for all users of module
module.exports = notesRouter