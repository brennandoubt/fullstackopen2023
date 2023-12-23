/**
 * File to test API for notes app
 * 
 * Uses supertest package to help
 * write API tests
 */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

// wrap Express app into a "superagent" object to test making http requests to backend
const api = supertest(app)

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
test('there are two notes', async () => {
  // inspect and verify response data
  const response = await api.get('/api/notes')

  // execution gets here only after HTTP request is complete
  // use 'await' keyword to await request before running here
  expect(response.body).toHaveLength(2)
})
test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/notes')

  expect(response.body[0].content).toBe('HTML is easy')
})

// close Mongoose database connection after all tests are finished
afterAll(async () => {
  await mongoose.connection.close()
})