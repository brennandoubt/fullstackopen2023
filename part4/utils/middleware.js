/**
 * middleware.js module to handle custom
 * middleware, such as requestLogger and
 * unknownEndpoint
 */
const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}

// middleware to extract token from a request
const tokenExtractor = (request, response, next) => {
  if (request.method === 'POST' || request.method === 'DELETE') {
    //logger.info('Extracting user token...')
    
    // extract token from Authorization header into request's token field
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      // place token into 'token' field of request object
      //logger.info('User token: ', authorization.replace('Bearer', ''))
      request.token = authorization.replace('Bearer ', '')
    } else {
      return response.status(401).json({ error: 'token not found' })
    }
  }

  next()
}
// middleware to find out user from a request
const userExtractor = async (request, response, next) => {
  if (request.method === 'POST' || request.method === 'DELETE') {
    //logger.info('Extracting token user...')

    // extract token's user into request object
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    request.user = await User.findById(decodedToken.id)
    //logger.info('Token user: ', request.user)
  }

  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}