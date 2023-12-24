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

// get all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

// create a new blog post
blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (blog.title && blog.url) {
    const result = await blog.save()
    response.status(201).json(result)
  } else {
    response.status(400).end()
  }
})

// delete a blog post
blogsRouter.delete('/:id', async (request, response) => {
  const blogs = await Blog.find({})
  const blogIDs = await blogs.map(blog => blog.id)
  if (blogIDs.includes(request.params.id)) {
    await Blog.findByIdAndDelete(request.params.id)
  }
  response.status(204).end()
})

module.exports = blogsRouter