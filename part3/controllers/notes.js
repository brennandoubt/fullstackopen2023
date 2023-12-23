/**
 * notes.js module to handle controllers/event
 * handlers of routes related to notes
 *
 * Uses Express' built-in app router to
 * create a new router object (isolated instance of
 * middleware/routes) used to define routes.
 */

// create new router object that all routes will be defined for
const notesRouter = require('express').Router()
const Note = require('../models/note')

// route to get all notes
notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
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

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  // use try-catch block for async/await error handling
  const savedNote = await note.save()
  response.status(201).json(savedNote)

  //next(exception) // pass request handling to error handling middleware
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