/**
 * note.js file to define Mongoose schema
 * and export matching model for notes
 */

const mongoose = require('mongoose')

// define validation rules for note schema
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// export note model to use in other files
module.exports = mongoose.model('Note', noteSchema)