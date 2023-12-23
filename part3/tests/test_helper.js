/**
 * File to handle verification steps
 * used in tests.
 */
const Note = require('../models/note')

// initial database state
const initialNotes = [
  {
    content: 'HTML is easy',
    important: true
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true
  }
]

// create database object ID that doesn't belong to any note in database
const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

// check notes stored in database
const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

module.exports = {
  initialNotes, nonExistingId, notesInDb
}