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

test('HTTP POST request creates a valid blog post', async () => {
  const newBlog = {
    title: 'Ideas on Unit Testing',
    author: 'Alan Hardy',
    url: 'n/a',
    likes: 23
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await testHelper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(testHelper.initialBlogs.length + 1)
})


// close Mongoose database connection after running all tests
afterAll(async () => {
  await mongoose.connection.close()
})