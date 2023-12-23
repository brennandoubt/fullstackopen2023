/**
 * Practice using MongoDB with Mongoose
 * 
 * 
 */
require('dotenv').config()

const mongoose = require('mongoose')

// pass password as command-line parameter (encode special characters)
const password = process.argv[2]

const url = process.env.TEST_MONGODB_URI

mongoose.set('strictQuery', false)

console.log(`Connecting to ${url}...`)
mongoose.connect(url).then(result => {
   console.log(`Connected to MongoDB!`)
})

// define a schema to tell Mongoose how note objects should be stored in database
const noteSchema = new mongoose.Schema({
   content: String,
   important: Boolean
})
// create matching model for defined schema to act as constructor for note objects
const Note = mongoose.model('Note', noteSchema)

const note1 = new Note({
   content: 'HTML is easy',
   important: false
})

const note2 = new Note({
   content: 'I had to write this',
   important: true
})

note2.save().then(result => {
   console.log(`Note saved!\nresult:\n${result}`)
})

// use mode to construct new note object
// const note = new Note({
//    content: 'HTML is Easy',
//    important: true
// })

// // save object to database with event handler to close database connection
// note.save().then(result => {
//    console.log('note saved!', `result: ${result}`)
//    mongoose.connection.close()
// })

// fetch note objects in database (use {} to fetch all objects)
Note.find({ important: true }).then(result => {
   result.forEach(note => {
      console.log(note)
   })
   console.log(`result:\n ${result}`)
   mongoose.connection.close()
})