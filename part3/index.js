/**
 * index.js: file to handle starting application
 *
 * Imports actual application from app.js, then
 * starts application.
 *
 * 3a) Making a backend web server
 *
 * Express library eases
 * server-side development with Node
 * (npm install express) makes express a project dependency
 * (npm update) updates dependencies
 * (npm install) installs dependencies for separate device
 *
 * Nodemon automatically restarts node app
 * when file changes are made
 *
 * Express helps make a REST interface
 * for app
 *
 * 3b) Use Express middleware 'static' in
 * backend to make express show static content,
 * such as page 'index.html' and JavaScript, etc.
 *
 * 3d) Use Lint or a linter to detect style and other
 * errors in programming languages, flag suspicious
 * language use and perform static analysis of source code
 *
 * (npm install eslint --save-dev) to add ESlint tool as
 * development dependency
 * (npx eslint --init) to initialize default ESlint configuration
 * (npx eslint [file_name_here.js]) to inspect/validate file
 */

const app = require('./app') // actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  // use logger module to log/print info about app to console
  logger.info(`Server running on port ${config.PORT}`)
})

/* ---CODE BEFORE REFACTOR IN SECTION 4a---
// import express function to create app
// const express = require('express')
// const app = express()
// require('dotenv').config()

const Note = require('./models/note')

// make express show fetched static content (middleware)
app.use(express.static('dist'))

app.use(express.json())

// enable cross-origin requests for resource sharing (middleware)
const cors = require('cors')
app.use(cors())

// to handle adding new notes to server (verify with Postman or REACT client)
app.post('/api/notes', (request, response, next) => {

  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
    .catch(error => next(error))
})

// define route to app to handle http get requests made to app's /root path
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>') // make server respond to http request
})

// define route to app to handle http get requests made to app's /api/notes path
app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    //console.log(`response: ${notes}`)
    response.json(notes)
  })
  //response.json(notes) // respond with notes array passed as a JSON formatted string
})

// implement route to handle http get requests of form /api/notes/x
app.get('/api/notes/:id', (request, response, next) => {
  // const id = Number(request.params.id)
  // const note = notes.find(note => note.id === id)

  // if (note) {
  //    response.json(note)
  // } else {
  //    response.status(404).end() // change to status 404 if note not found
  // }

  Note.findById(request.params.id).then(note => {
    //console.log(`response: ${note}`)
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  })
  // pass error forward to next route/middleware
    .catch(error => next(error))
})

// implement route to delete resources: HTTP DELETE request
app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      console.log(`result:\n ${result}`)
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' }  // validate notes also when edited
  )
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handle requests with unknown endpoint (middleware)
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// handle requests with result to errors, has to be last loaded middleware
app.use(errorHandler)

*/

/**
 * (fly launch) in root of backend project to
 * initialize app
 *
 * (fly deploy) to deploy current version of
 * app to Fly.io servers
 *
 * (fly open) to open app in browser
 *
 * (fly logs) to view server logs
 *
 * (npm run build) in root of frontend project to create
 * production build: version of app optimized for production
 * instead of development
 */
/*
const PORT = process.env.PORT // use port env or 3001 if undefined
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
*/