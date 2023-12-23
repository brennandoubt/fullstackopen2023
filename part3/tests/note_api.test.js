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
const app = require('../app')

// wrap Express app into a "superagent" object to test making http requests to backend
const api = supertest(app)
const Note = require('../models/note')

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true
  }
]

beforeEach(async () => {
  await Note.deleteMany({})
  let noteObject = new Note(initialNotes[0])
  await noteObject.save()
  noteObject = new Note(initialNotes[1])
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

// test adding two notes to test database using mongo.js program
test('all notes are returned', async () => {
  // verify response data
  const response = await api.get('/api/notes')

  // execution gets here only after HTTP request is complete due to 'await'
  expect(response.body).toHaveLength(initialNotes.length)
})
test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map(r => r.content)

  // toContain to check if contents array contains this note
  expect(contents).toContain(
    'Browser can execute only JavaScript'
  )
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