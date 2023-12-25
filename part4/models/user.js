/**
 * Define schema and model for representing users
 * in blog list app database
 */
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    required: true,
    unique: true
  },
  name: String,
  passwordHash: String,
  // store ids of blogs created by user in user document
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // do not reveal password hash
    delete returnedObject.passwordHash
  }
})

// give Mongoose a validator to check uniqueness of a field
userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User