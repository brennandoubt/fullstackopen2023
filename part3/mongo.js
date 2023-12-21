/**
 * Practice using MongoDB with Mongoose
 * 
 * 
 */

const mongoose = require('mongoose')

if (process.argv.length < 3) {
   console.log('give password as argument')
   process.exit(1)
}

// pass password as command-line parameter (encode special characters)
const password = process.argv[2]

const url = `mongodb+srv://bdoubt:${password}@cluster0.ptdgwee.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

// define a schema to tell Mongoose how note objects should be stored in database
const noteSchema = new mongoose.Schema({
   content: String,
   important: Boolean
})
// create matching model for defined schema to act as constructor for note objects
const Note = mongoose.model('Note', noteSchema)

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