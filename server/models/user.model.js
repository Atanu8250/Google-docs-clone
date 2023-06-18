// Import the Mongoose library
const mongoose = require("mongoose");

// Define the user schema using the Mongoose Schema constructor
const userSchema = mongoose.Schema({
     // Define the username field as a required string
     username: {
          type: String,
          required: true,
          immutable: true
     },
     // Define the avatarURL field as a string with a default value
     avatarURL: {
          type: String,
          default: "https://cdn-icons-png.flaticon.com/512/666/666201.png"
     },
     // Define the email field as a required string with unique constraint
     email: {
          type: String,
          required: true,
          immutable: true,
          unique: true
     },
     // Define the password field as a required string
     password: {
          type: String,
          required: true
     }
}, { versionKey: false, timestamps: true });
// The options object is provided as the second argument to the Schema constructor
// We set `versionKey` to false to exclude the "__v" field from documents
// We set `timestamps` to true to automatically add "createdAt" and "updatedAt" fields

// Create the User model using the defined schema
const UserModel = mongoose.model('user', userSchema);

// Export the User model to be used in other files
module.exports = { UserModel };
