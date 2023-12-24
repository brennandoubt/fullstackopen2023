/**
 * File to handle verification steps
 * used in tests
 * 
 */
const Note = require('../models/note')
const User = require('../models/user')

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

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialNotes, nonExistingId, notesInDb, usersInDb
}