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
const User = require('../models/user')

// get all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

// create a new blog post
blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (blog.title && blog.url) {
    // designate first user found from database as creator of new blog post
    const users = await User.find({})
    blog.user = users[0].id

    const result = await blog.save()
    users[0].blogs = users[0].blogs.concat(result._id)
    await users[0].save()

    response.status(201).json(result)
  } else {
    response.status(400).end()
  }
})

// delete a blog post
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

// update a blog post
blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter