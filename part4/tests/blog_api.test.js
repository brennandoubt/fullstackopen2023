/**
 * File to handle testing API for
 * blog list app
 */
const mongoose = require('mongoose')
const supertest = require('supertest')
const testHelper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

// reset database prior to each test
beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = testHelper.initialBlogs.map(blog => new Blog(blog))
  const promises = blogObjects.map(blog => blog.save())
  await Promise.all(promises)
})

// verify correct amount of blog posts in JSON format are returned from http get request
test('all blogs are returned as JSON', async () => {
  // check response is in JSON format
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  // check response has correct number of blogs
  expect(response.body).toHaveLength(testHelper.initialBlogs.length)
})

test('blogs have a unique \'id\' property', async () => {
  // has 'id' property once converted to json
  const blogObject = new Blog().toJSON()

  // check 'id' property is defined for blogs
  expect(blogObject.id).toBeDefined()
})


afterAll(async () => {
  await mongoose.connection.close()
})