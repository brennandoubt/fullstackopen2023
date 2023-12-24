/**
 * File to define schema and model for representing
 * users
 * 
 * Uses bcrypt package to generate password hashes.
 * Uses mongoose-unique-validator library to give Mongoose
 * a validator to check the uniqueness of a field.
 */
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// array of note IDs stored in user document
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  // output of a one-way hash function applied to user's password to encrypt it in database
  passwordHash: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User