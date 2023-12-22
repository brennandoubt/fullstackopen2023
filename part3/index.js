/**
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
 */

// import express function to create app
const express = require('express')
const app = express()
require('dotenv').config()

const Note = require('./models/note')

app.use(express.json())

// make express show fetched static content (middleware)
app.use(express.static('dist'))

// enable cross-origin requests for resource sharing (middleware)
const cors = require('cors')
app.use(cors())


// find largest id number in current list to assign to maxId (not recommended but using for now)
const generateId = () => {
   const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id)) // transform array into indiviual number using "three dot" spread syntax
      : 0
   return maxId + 1
}

// to handle adding new notes to server (verify with Postman or REACT client)
app.post('/api/notes', (request, response) => {
   const body = request.body

   if (!body.content) {
      return response.status(400).json({ // return here to keep bad note from being saved to app
         error: 'content missing'
      })
   }

   const note = {
      content: body.content,
      important: body.important || false,
      id: generateId()
   }

   notes = notes.concat(note)

   response.json(note)
})

let notes = [
   {
      id: 1,
      content: "HTML is easy",
      important: true
   },
   {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
   },
   {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
   }
]

// define route to app to handle http get requests made to app's /root path
app.get('/', (request, response) => {
   response.send('<h1>Hello World!</h1>') // make server respond to http request
})

// define route to app to handle http get requests made to app's /api/notes path
app.get('/api/notes', (request, response) => {
   Note.find({}).then(notes => {
      response.json(notes)
   })
   //response.json(notes) // respond with notes array passed as a JSON formatted string
})

// implement route to handle http get requests of form /api/notes/x
app.get('/api/notes/:id', (request, response) => {
   const id = Number(request.params.id)
   const note = notes.find(note => note.id === id)

   if (note) {
      response.json(note)
   } else {
      response.status(404).end() // change to status 404 if note not found
   }
})

// implement route to delete resources: HTTP DELETE request
app.delete('/api/notes/:id', (request, response) => {
   const id = Number(request.params.id)
   notes = notes.filter(note => note.id !== id)

   response.status(204).end()
})

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

const PORT = process.env.PORT // use port env or 3001 if undefined
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`)
})