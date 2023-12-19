/**
 * 3a) Making a simple backend web server
 * 
 * Express library eases
 * server-side development with Node
 * (npm install express) makes express a project dependency
 * (npm update) updates dependencies
 * (npm install) installs dependencies for separate device
 */
const http = require('http') // import Node's built-in web server module


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

const app = http.createServer((request, response) => {
   response.writeHead(200, { 'Content-Type': 'application/json' }) // respond to http request
   response.end(JSON.stringify(notes)) // set content on site
})

// bind web server to listen to http requests sent to port 3001 (http://localhost:3001)
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)