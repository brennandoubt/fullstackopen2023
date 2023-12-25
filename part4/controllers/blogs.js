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

// for token-based user authentication
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

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
    const requestToken = getTokenFrom(request)
    if (!requestToken) {
      return response.status(401).json({ error: 'token not found' })
    }
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    // decoded token contains username/id fields to tell server who made the request
    const user = await User.findById(decodedToken.id)
    blog.user = user.id

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
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