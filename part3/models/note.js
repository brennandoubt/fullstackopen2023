/**
 * Note model for app made with Mongoose
 */
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
   .then(result => {
      console.log('connected to MongoDB')
   })
   .catch(error => {
      console.log('error connecting to MongoDB:', error.message)
      process.exit(1)
   })

// can define specific validation rules for each field in schema using Mongoose
const noteSchema = new mongoose.Schema({
   // content: String,
   // important: Boolean
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

module.exports = mongoose.model('Note', noteSchema)