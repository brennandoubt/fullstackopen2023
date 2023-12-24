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
  important: Boolean,
  // expand note schema to include info on user who created the note
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
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