/**
 * blogs.js module to handle controllers/event
 * handlers of routes
 *
 * Uses Express' built-in app router to
 * create a new router object (isolated instance of
 * middleware/routes).
 */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
  })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog.save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter