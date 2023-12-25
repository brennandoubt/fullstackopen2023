/**
 * app.js file to create actual application
 * and establish connection to MongoDB document
 * database
 *
 * Takes router and other different middleware
 * into use.
 */
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info(`Connecting to ${config.MONGODB_URI}...`)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB!')
  })
  .catch((error) => {
    logger.error(`Error: ${error.message}`)
  })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

app.use(middleware.requestLogger)

app.use('/api/users', usersRouter)

app.use('/api/login', loginRouter)

// register before blogs router to extract user authentication tokens for blog posts
app.use(middleware.tokenExtractor)

// blogs router attached to /api/blogs route
app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app