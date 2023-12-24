/**
 * File to handle testing API for
 * blog list app
 * 
 * Use toContain() to verify an array
 * contains a specific value. Use 
 * toContainEqual() to verify an array
 * contains a specific object.
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
  const newBlogID = await testHelper.nonExistingId() // to find blog in database
  const newBlog = {
    id: newBlogID,
    title: 'Ideas on Unit Testing',
    author: 'Alan Hardy',
    url: 'cantsay',
    likes: 23
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await testHelper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(testHelper.initialBlogs.length + 1)

  // convert new and posted blogs to json objects and match properties
  const postedBlog = await Blog.findById(newBlogID)
  expect(postedBlog.toJSON()).toEqual(new Blog(newBlog).toJSON())
})

test('a blog posted with no \'likes\' property has 0 likes', async () => {
  const blogID = await testHelper.nonExistingId() // to find blog later in database
  const newBlog = {
    id: blogID,
    title: 'My Thoughts',
    author: 'Terra',
    url: 'notsure'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const postedBlog = await Blog.findById(blogID)

  expect(postedBlog.likes).toBeDefined()
  expect(postedBlog.likes).toBe(0)
})

test('posting a blog with no title returns status code 400', async () => {
  const newBlog = {
    author: 'Terra',
    url: 'somethingdotcom',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await testHelper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(testHelper.initialBlogs.length)
})

test('posting a blog with no url returns status code 400', async () => {
  const newBlog = {
    title: 'My Thoughts',
    author: 'Terra',
    likes: 16
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await testHelper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(testHelper.initialBlogs.length)
})

test('posting a blog with no title or url returns status code 400', async () => {
  const newBlog = {
    author: 'Terra',
    likes: 4
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await testHelper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(testHelper.initialBlogs.length)
})

describe('deleting a blog post', () => {
  test('with a valid id is successful', async () => {
    const blogsAtStart = await testHelper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    
    const blogsAtEnd = await testHelper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(testHelper.initialBlogs.length - 1)
    
    const ids = blogsAtEnd.map(blog => blog.id)
    expect(ids).not.toContain(blogToDelete.id)
  }, 10000)
})

describe('updating a blog post', () => {
  test('with a valid id is successful', async () => {
    const blogsAtStart = await testHelper.blogsInDb()
    const updatedBlog = {
      title: blogsAtStart[0].title,
      author: blogsAtStart[0].author,
      url: blogsAtStart[0].url,
      likes: (blogsAtStart[0].likes + 1) // increasing a blog post's likes by 1
    }

    await api
      .put(`/api/blogs/${blogsAtStart[0].id}`)
      .send(updatedBlog)
      .expect(200)

    const blogsAtEnd = await testHelper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(testHelper.initialBlogs.length)
  }, 10000)
})



// close Mongoose database connection after running all tests
afterAll(async () => {
  await mongoose.connection.close()
})