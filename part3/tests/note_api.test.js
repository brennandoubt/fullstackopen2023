/**
 * File to test API for notes app
 * 
 * Uses supertest package to help
 * write API tests. Initializes database
 * before every test to generate test data
 * in a more controlled manner.
 * 
 * (npm test -- tests/note_api.test.js) to only run tests in this file
 * 
 * (npm test -- -t "[test_or_describe_name]") to only run tests with a specific name
 * 
 * Use async/await to avoid callback hell! Operator await must be used
 * inside async functions, and with asynchronous operations that return a promise.
 */
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

// wrap Express app into a "superagent" object to test making http requests to backend
const api = supertest(app)
const Note = require('../models/note')

beforeEach(async () => {
  await Note.deleteMany({})

  let noteObject = new Note(helper.initialNotes[0])
  await noteObject.save()

  noteObject = new Note(helper.initialNotes[1])
  await noteObject.save()
})

// test http GET request to api/notes and verify response has status code 200
test('notes are returned as json',
  // use async/await syntax since request to API is asynchronous
  async () => {
    await api
      .get('/api/notes')
      .expect(200)
      // use regex to just test if content type contains expression
      .expect('Content-Type', /application\/json/)
}, 100000) // can increase test timeout length (default is 5000 ms)


test('all notes are returned', async () => {
  // verify response data
  const response = await api.get('/api/notes')

  // execution gets here only after HTTP request is complete due to 'await'
  expect(response.body).toHaveLength(helper.initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map(r => r.content)

  // toContain to check if contents array contains this note
  expect(contents).toContain(
    'Browser can execute only JavaScript'
  )
})

test('a valid note can be added', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const notesAtEnd = await helper.notesInDb()
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)

  const contents = notesAtEnd.map(n => n.content)
  expect(contents).toContain(
    'async/await simplifies making async calls'
  )
})

test('note without content is not added', async () => {
  const newNote = {
    important: true
  }

  // execute saving operation for note
  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)

  // check state stored in database after operation by fetching all notes in app
  const notesAtEnd = await helper.notesInDb()
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
})

test('a specific note can be viewed', async () => {
  const notesAtStart = await helper.notesInDb()

  const noteToView = notesAtStart[0]

  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(resultNote.body).toEqual(noteToView)
})

test('a note can be deleted', async () => {
  const notesAtStart = await helper.notesInDb()
  const noteToDelete = notesAtStart[0]

  await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(204)

  const notesAtEnd = await helper.notesInDb()

  expect(notesAtEnd).toHaveLength(
    helper.initialNotes.length - 1
  )

  const contents = notesAtEnd.map(r => r.content)

  expect(contents).not.toContain(noteToDelete.content)
})

// close Mongoose database connection after all tests are finished
afterAll(async () => {
  await mongoose.connection.close()
})

/* ---EXAMPLE OF WRITING ASYNCHRONOUS CODE THAT "LOOKS SYNCHRONOUS"---

// declare function assigned to 'main' as asynchronous
const main = async () => {
  // run this line using 'await' keyword
  const notes = await Note.find({})

  // run this line only after above line is finished
  const response = await notes[0].deleteOne()

  // run this line only after above line is finished
  console.log('the first note is removed')
}

// call asynchronous main function
main()

*/