const { model, Schema } = require('mongoose');

// Define the document schema
const docSchema = new Schema({
     // Define the author field as a reference to the User model's ObjectId
     author: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'user' // Referencing the 'user' collection/model
     },
     // Define the title field as a required string
     title: {
          type: String,
          required: true,
     },
     // Define the isPublic field as a boolean with a default value of false
     isPublic: {
          type: Boolean,
          default: false
     },
     // Define the doc field as an object with a default value of an empty string
     doc: {
          type: Object,
          default: ""
     }
}, { timestamps: true });
// The options object is provided as the second argument to the Schema constructor
// We set `timestamps` to true to automatically add "createdAt" and "updatedAt" fields

// Create the Document model using the defined schema
module.exports = model('Document', docSchema);
// Export the Document model to be used in other files
